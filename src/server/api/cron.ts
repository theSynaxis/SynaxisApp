import { lucia } from './auth';

export const destroySessions = async () => {
  await lucia.deleteExpiredSessions();
}
