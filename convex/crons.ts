import { cronJobs } from 'convex/server';
import { internal } from './_generated/api';

const crons = cronJobs();

crons.interval(
  'expire stale lobbies',
  { seconds: 30 },
  internal.crons_internal.expireStaleInternal
);

export default crons;
