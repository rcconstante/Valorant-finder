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
        await ctx.db.patch(lobby._id, {
          status: 'expired',
          updatedAt: now,
        });
      }
    }
  },
});
