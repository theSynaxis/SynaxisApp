"use server";
import { cookies } from "next/headers";

export function activeSession(): boolean {
    const session = cookies().get("auth_session");

    return Boolean(session);
}
