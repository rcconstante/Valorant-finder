import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

const FIVE_MINUTES = 5 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;

// --- Security: Whitelisted values ---
const VALID_REGIONS = ['APAC', 'NA', 'EU', 'LATAM', 'KR', 'JP', 'MENA', 'OCE'];
const VALID_GAME_MODES = ['Competitive', 'Unrated', 'Swiftplay', 'Spike Rush', 'Deathmatch', 'Premier', 'Escalation'];
const VALID_RANKS = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'];
const VALID_COMMS = ['Voice Required', 'Text Only', 'Either'];
const VALID_PLAYSTYLES = ['Chill / Casual', 'Balanced', 'Serious / Tryhard', 'For Fun / Memes'];
const VALID_LANGUAGES = ['English', 'Filipino', 'Japanese', 'Korean', 'Mixed / Any'];
const VALID_REPORT_REASONS = ['spam', 'offensive', 'fake_code', 'harassment', 'other'];

const PROFANITY_LIST = ['fuck', 'shit', 'bitch', 'nigger', 'faggot', 'retard', 'cunt', 'whore', 'slut', 'dick', 'cock', 'pussy'];

function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase().replace(/[^a-z]/g, '');
  return PROFANITY_LIST.some((word) => lower.includes(word));
}

/** Strip HTML/script tags and control characters — XSS prevention */
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '')          // strip angle brackets
    .replace(/javascript:/gi, '')  // strip JS protocol
    .replace(/on\w+\s*=/gi, '')    // strip inline event handlers
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // strip control chars
    .trim();
}

/** Validate session and return it, or throw */
async function requireSession(ctx: any, sessionToken: string) {
  if (!sessionToken || sessionToken.length > 100) {
    throw new Error('Invalid session token');
  }
  const session = await ctx.db
    .query('anonymous_sessions')
    .withIndex('by_token', (q: any) => q.eq('sessionToken', sessionToken))
    .first();
  if (!session) throw new Error('Invalid session');
  if (session.isBlocked) throw new Error('Session is blocked');
  return session;
}

export const create = mutation({
  args: {
    sessionToken: v.string(),
    partyCode: v.string(),
    region: v.string(),
    gameMode: v.string(),
    rankMin: v.optional(v.string()),
    rankMax: v.optional(v.string()),
    rankAny: v.boolean(),
    slotsNeeded: v.number(),
    commsPreference: v.string(),
    playstyle: v.string(),
    language: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const session = await requireSession(ctx, args.sessionToken);

    // --- Input sanitization ---
    const partyCode = sanitize(args.partyCode);
    const notes = args.notes ? sanitize(args.notes) : undefined;

    // --- Validation: lengths ---
    if (!partyCode || partyCode.length < 2 || partyCode.length > 30) {
      throw new Error('Party code must be 2-30 characters');
    }
    if (!Number.isInteger(args.slotsNeeded) || args.slotsNeeded < 1 || args.slotsNeeded > 4) {
      throw new Error('Slots needed must be 1-4');
    }
    if (notes && notes.length > 120) {
      throw new Error('Notes must be 120 characters or less');
    }

    // --- Validation: whitelist enums ---
    if (!VALID_REGIONS.includes(args.region)) {
      throw new Error('Invalid region');
    }
    if (!VALID_GAME_MODES.includes(args.gameMode)) {
      throw new Error('Invalid game mode');
    }
    if (!VALID_COMMS.includes(args.commsPreference)) {
      throw new Error('Invalid comms preference');
    }
    if (!VALID_PLAYSTYLES.includes(args.playstyle)) {
      throw new Error('Invalid playstyle');
    }
    if (args.language && !VALID_LANGUAGES.includes(args.language)) {
      throw new Error('Invalid language');
    }
    if (!args.rankAny) {
      if (args.rankMin && !VALID_RANKS.includes(args.rankMin)) {
        throw new Error('Invalid min rank');
      }
      if (args.rankMax && !VALID_RANKS.includes(args.rankMax)) {
        throw new Error('Invalid max rank');
      }
    }

    // --- Profanity check ---
    if (notes && containsProfanity(notes)) {
      throw new Error('Notes contain inappropriate language');
    }
    if (containsProfanity(partyCode)) {
      throw new Error('Party code contains inappropriate language');
    }

    // --- Rate limit: max 2 active lobbies per session ---
    const activeLobbies = await ctx.db
      .query('lobbies')
      .withIndex('by_session', (q) => q.eq('sessionId', session._id).eq('status', 'active'))
      .collect();
    if (activeLobbies.length >= 2) {
      throw new Error('Maximum 2 active lobbies per session');
    }

    // --- Rate limit: no more than 1 lobby creation per minute ---
    const recentLobbies = await ctx.db
      .query('lobbies')
      .withIndex('by_session', (q) => q.eq('sessionId', session._id))
      .order('desc')
      .take(1);
    if (recentLobbies.length > 0) {
      const lastCreated = recentLobbies[0].createdAt;
      if (Date.now() - lastCreated < ONE_MINUTE) {
        throw new Error('Please wait before creating another lobby');
      }
    }

    const now = Date.now();
    const lobbyId = await ctx.db.insert('lobbies', {
      sessionId: session._id,
      partyCode,
      region: args.region,
      gameMode: args.gameMode,
      rankMin: args.rankAny ? undefined : args.rankMin,
      rankMax: args.rankAny ? undefined : args.rankMax,
      rankAny: args.rankAny,
      slotsNeeded: args.slotsNeeded,
      commsPreference: args.commsPreference,
      playstyle: args.playstyle,
      language: args.language,
      notes,
      status: 'active',
      extensionsUsed: 0,
      maxExtensions: 3,
      createdAt: now,
      updatedAt: now,
      expiresAt: now + FIVE_MINUTES,
    });

    return lobbyId;
  },
});

export const extend = mutation({
  args: {
    lobbyId: v.id('lobbies'),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await requireSession(ctx, args.sessionToken);

    const lobby = await ctx.db.get(args.lobbyId);
    if (!lobby) throw new Error('Lobby not found');
    if (lobby.sessionId !== session._id) throw new Error('Not the lobby creator');
    if (lobby.status !== 'active') throw new Error('Lobby is not active');

    const now = Date.now();
    if (lobby.expiresAt <= now) throw new Error('Lobby has already expired');
    if (lobby.extensionsUsed >= lobby.maxExtensions) {
      throw new Error('Maximum extensions reached');
    }

    await ctx.db.patch(args.lobbyId, {
      expiresAt: lobby.expiresAt + FIVE_MINUTES,
      extensionsUsed: lobby.extensionsUsed + 1,
      lastExtendedAt: now,
      updatedAt: now,
    });
  },
});

export const deleteLobby = mutation({
  args: {
    lobbyId: v.id('lobbies'),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await requireSession(ctx, args.sessionToken);

    const lobby = await ctx.db.get(args.lobbyId);
    if (!lobby) throw new Error('Lobby not found');
    if (lobby.sessionId !== session._id) throw new Error('Not the lobby creator');

    await ctx.db.patch(args.lobbyId, {
      status: 'deleted',
      updatedAt: Date.now(),
    });
  },
});

export const listActive = query({
  args: {
    region: v.optional(v.string()),
    gameMode: v.optional(v.string()),
    rankMin: v.optional(v.string()),
    playstyle: v.optional(v.string()),
    comms: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    let lobbies = await ctx.db
      .query('lobbies')
      .withIndex('by_status_expires', (q) => q.eq('status', 'active'))
      .order('desc')
      .collect();

    // Filter expired ones (cron handles DB cleanup)
    lobbies = lobbies.filter((l) => l.expiresAt > now);

    if (args.region && args.region !== 'All Regions') {
      lobbies = lobbies.filter((l) => l.region === args.region);
    }
    if (args.gameMode && args.gameMode !== 'All Modes') {
      lobbies = lobbies.filter((l) => l.gameMode === args.gameMode);
    }
    if (args.playstyle && args.playstyle !== 'All') {
      lobbies = lobbies.filter((l) => l.playstyle === args.playstyle);
    }
    if (args.comms && args.comms !== 'All') {
      lobbies = lobbies.filter((l) => l.commsPreference === args.comms);
    }

    return lobbies;
  },
});

export const getById = query({
  args: { lobbyId: v.id('lobbies') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.lobbyId);
  },
});

export const getMyLobbies = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    if (!args.sessionToken || args.sessionToken.length > 100) return [];
    const session = await ctx.db
      .query('anonymous_sessions')
      .withIndex('by_token', (q) => q.eq('sessionToken', args.sessionToken))
      .first();
    if (!session) return [];

    return await ctx.db
      .query('lobbies')
      .withIndex('by_session', (q) => q.eq('sessionId', session._id).eq('status', 'active'))
      .collect();
  },
});

export const report = mutation({
  args: {
    lobbyId: v.id('lobbies'),
    sessionToken: v.string(),
    reason: v.string(),
    details: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // --- Validate reason against whitelist ---
    if (!VALID_REPORT_REASONS.includes(args.reason)) {
      throw new Error('Invalid report reason');
    }

    // --- Sanitize details ---
    const details = args.details ? sanitize(args.details).slice(0, 250) : undefined;

    // --- Validate lobby exists ---
    const lobby = await ctx.db.get(args.lobbyId);
    if (!lobby) throw new Error('Lobby not found');

    const session = await ctx.db
      .query('anonymous_sessions')
      .withIndex('by_token', (q) => q.eq('sessionToken', args.sessionToken))
      .first();

    // --- Rate limit: max 5 reports per session per 10 min ---
    if (session) {
      const tenMinAgo = Date.now() - 10 * ONE_MINUTE;
      const recentReports = await ctx.db
        .query('lobby_reports')
        .withIndex('by_lobby', (q) => q.eq('lobbyId', args.lobbyId))
        .collect();
      const sessionReports = recentReports.filter(
        (r) => r.sessionId === session._id && r.createdAt > tenMinAgo
      );
      if (sessionReports.length >= 5) {
        throw new Error('Too many reports. Please wait.');
      }
    }

    await ctx.db.insert('lobby_reports', {
      lobbyId: args.lobbyId,
      sessionId: session?._id,
      reason: args.reason,
      details,
      createdAt: Date.now(),
    });
  },
});

export const expireStale = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const stale = await ctx.db
      .query('lobbies')
      .withIndex('by_status_expires', (q) => q.eq('status', 'active'))
      .collect();

    for (const lobby of stale) {
      if (lobby.expiresAt <= now) {
        await ctx.db.patch(lobby._id, {
          status: 'expired',
          updatedAt: now,
        });
      }
    }
  },
});
