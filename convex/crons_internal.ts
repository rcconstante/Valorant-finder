import { internalMutation } from './_generated/server';

export const expireStaleInternal = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const stale = await ctx.db
      .query('lobbies')
      .withIndex('by_status_expires', (q) => q.eq('status', 'active'))
      .collect();

    for (const lobby of stale) {
      if (lobby.expiresAt <= now) {
        // Delete associated reports first
        const reports = await ctx.db
          .query('lobby_reports')
          .withIndex('by_lobby', (q) => q.eq('lobbyId', lobby._id))
          .collect();
        for (const report of reports) {
          await ctx.db.delete(report._id);
        }
        // Delete the lobby document entirely
        await ctx.db.delete(lobby._id);
      }
    }

    // Also clean up lobbies that were marked deleted more than 1 minute ago
    const deleted = await ctx.db
      .query('lobbies')
      .withIndex('by_status_expires', (q) => q.eq('status', 'deleted'))
      .collect();
    for (const lobby of deleted) {
      if (lobby.updatedAt <= now - 60_000) {
        const reports = await ctx.db
          .query('lobby_reports')
          .withIndex('by_lobby', (q) => q.eq('lobbyId', lobby._id))
          .collect();
        for (const report of reports) {
          await ctx.db.delete(report._id);
        }
        await ctx.db.delete(lobby._id);
      }
    }
  },
});
