import { drizzle as localDrizzle } from "drizzle-orm/postgres-js";
import { drizzle as launchDrizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import postgres from "postgres";

import { env } from "~/env.js";
import * as schema from "./schema";

export const db = env.NODE_ENV === "development" ? localDrizzle(postgres(env.DATABASE_URL), { schema }) : launchDrizzle(sql, { schema });
