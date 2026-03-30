import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

const SESSION_TOKEN_MAX_LENGTH = 100;
const SESSION_TOKEN_PATTERN = /^anon_[0-9a-f]{32}$/;

export const initSession = mutation({
  args: { sessionToken: v.string(), fingerprint: v.optional(v.string()) },
  handler: async (ctx, args) => {
    // --- Security: Validate token format ---
    if (
      !args.sessionToken ||
      args.sessionToken.length > SESSION_TOKEN_MAX_LENGTH ||
      !SESSION_TOKEN_PATTERN.test(args.sessionToken)
    ) {
      throw new Error('Invalid session token format');
    }

    // Sanitize fingerprint
    const fingerprint = args.fingerprint?.slice(0, 64) || undefined;

    const existing = await ctx.db
      .query('anonymous_sessions')
      .withIndex('by_token', (q) => q.eq('sessionToken', args.sessionToken))
      .first();

    if (existing) {
      if (existing.isBlocked) throw new Error('Session is blocked');
      const patch: Record<string, unknown> = { lastSeenAt: Date.now() };
      if (fingerprint && !existing.fingerprint) {
        patch.fingerprint = fingerprint;
      }
      await ctx.db.patch(existing._id, patch);
      return existing._id;
    }

    const id = await ctx.db.insert('anonymous_sessions', {
      sessionToken: args.sessionToken,
      createdAt: Date.now(),
      lastSeenAt: Date.now(),
      isBlocked: false,
      fingerprint,
    });
    return id;
  },
});

export const getSession = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    if (!args.sessionToken || args.sessionToken.length > SESSION_TOKEN_MAX_LENGTH) {
      return null;
    }
    return await ctx.db
      .query('anonymous_sessions')
      .withIndex('by_token', (q) => q.eq('sessionToken', args.sessionToken))
      .first();
  },
});
