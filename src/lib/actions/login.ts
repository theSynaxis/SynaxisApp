"use server";
import { cookies } from "next/headers";

import type { Cookie } from "oslo/cookie";

export async function loginAction(cookie: Cookie): Promise<void> {
    cookies().set(
        cookie.name,
        cookie.value,
        cookie.attributes,
    );
}