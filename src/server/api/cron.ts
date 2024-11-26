import { lucia } from "./auth";

export const destroySessions = async () => {
  await lucia.deleteExpiredSessions();
};

// TODO: add cron job to unban users at specified ban times.
// grab all banned users.
// forEach user, compare bannedUntil time to new Date()
// if day/month/year match, update user to isBanned = false.
