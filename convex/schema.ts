import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  anonymous_sessions: defineTable({
    sessionToken: v.string(),
    createdAt: v.number(),
    lastSeenAt: v.number(),
    isBlocked: v.boolean(),
  }).index('by_token', ['sessionToken']),

  lobbies: defineTable({
    sessionId: v.id('anonymous_sessions'),
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
    status: v.string(), // 'active' | 'expired' | 'deleted'
    extensionsUsed: v.number(),
    maxExtensions: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    expiresAt: v.number(),
    lastExtendedAt: v.optional(v.number()),
  })
    .index('by_status_expires', ['status', 'expiresAt'])
    .index('by_session', ['sessionId', 'status'])
    .index('by_region_mode', ['status', 'region', 'gameMode']),

  lobby_reports: defineTable({
    lobbyId: v.id('lobbies'),
    sessionId: v.optional(v.id('anonymous_sessions')),
    reason: v.string(),
    details: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_lobby', ['lobbyId']),
});
