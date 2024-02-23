import { cookies } from "next/headers";
import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

// import components
import { db } from "../db";
import { sessions, users } from "~/server/db/schema";

// import types
import type { Session, User } from "lucia";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false, // session cookies have very long lifespan (2 years)
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

export const uncachedValidateRequest = async (): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {
	const sessionCookieName = lucia.sessionCookieName;
	const sessionId = cookies().get(sessionCookieName)?.value ?? null;

	if (!sessionId) {
		return { user: null, session: null };
	}
	const result = await lucia.validateSession(sessionId);

	return result;
};
