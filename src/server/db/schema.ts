// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  date,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `synaxis-app_${name}`);

export const users = createTable(
  "users", {
    id: serial('id').primaryKey(),
    username: varchar("username", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    patron: varchar("patron", { length: 256 }),
    bio: varchar("bio", { length: 256 }),
    birthday: date("birthday"),
    nameday: date("nameday"),
    location: varchar("location", { length: 256 }),
    jurisdiction: varchar("jurisdiction", { length: 256 }),
    denomination: varchar("denomination", { length: 256 }),
    sex: varchar("sex", { length: 256 }),
    joinedDate: timestamp("joined_date").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedDate: timestamp("updated_date").default(sql`CURRENT_TIMESTAMP`).notNull(),
  }
)

export const parishes = createTable(
  "parishes", {
    id: serial("id").primaryKey(),
    isMonastery: boolean("is_monastery").default(false).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    jurisdiction: varchar("jurisdiction", { length: 256 }).notNull(),
    diocese: varchar("diocese", { length: 256 }).notNull(),
    priest: varchar("priest", { length: 256 }),
    bishop: varchar("bishop", { length: 256 }).notNull(),
    patronalFeast: date("patronal_feast"),
    streetAddress: varchar("street_address", { length: 256 }).notNull(),
    city: varchar("city", { length: 256 }).notNull(),
    state: varchar("state", { length: 256 }).notNull(),
    zipCode: varchar("zip_code", { length: 256 }).notNull(),
    website: varchar("website", { length: 256 }),
    googleCalendarId: varchar("google_calendar_id", { length: 256 }),
    createdDate: timestamp("created_date").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedDate: timestamp("updated_date").default(sql`CURRENT_TIMESTAMP`).notNull(),
  }
)