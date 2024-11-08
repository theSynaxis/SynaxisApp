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
  integer,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `synaxis-app_${name}`);

export const users = createTable("users", {
  id: varchar("id").primaryKey(),
  // roles: user, moderator, administrator
  role: varchar("role").notNull().default("user"),
  username: varchar("username", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
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
  joinedDate: timestamp("joined_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isBanned: boolean("is_banned").default(false),
  isDeleted: boolean("is_deleted").default(false),
});

export const sessions = createTable("sessions", {
  id: varchar("session_id").primaryKey(),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  loginTime: timestamp("login_time")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  // ip address?
});

export const emailVerificationCodes = createTable("email_verification_codes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 21 }).unique().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  code: varchar("code", { length: 8 }).notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const passwordResetTokens = createTable("password_reset_tokens", {
  id: varchar("id", { length: 40 }).primaryKey(),
  userId: varchar("user_id", { length: 21 }).notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const parishes = createTable("parishes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  adminId: varchar("admin_id")
    .references(() => users.id)
    .notNull(),
  isMonastery: boolean("is_monastery").default(false).notNull(),
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
  isActivated: boolean("is_activated").default(false).notNull(),
  createdDate: timestamp("created_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedBy: varchar("updated_by").references(() => users.id),
  isDeleted: boolean("is_deleted").default(false),
});

export const saints = createTable("saints", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  life: varchar("life"),
  apostle: varchar("apostle"),
  clergy: varchar("clergy"),
  royal: varchar("is_ruler"),
  martyr: varchar("martyr"),
  isMonk: boolean("is_monk").default(false).notNull(),
  isMarried: boolean("is_married").default(false).notNull(),
  isMale: boolean("is_male").default(true).notNull(),
  isLevite: boolean("is_levite").default(false).notNull(),
  isFoolForChrist: boolean("is_fool_for_christ").default(false).notNull(),
  isBc: boolean("is_bc").notNull(),
  yearBorn: integer("year_born"),
  yearDied: integer("year_died"),
  feastDate: varchar("feast_date").notNull(),
  feastType: varchar("feast_type").notNull(),
  // because users can submit saints, they need to be approved before publically consumed.
  isApproved: boolean("is_approved").default(false).notNull(),
  createdDate: timestamp("created_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedBy: varchar("updated_by").references(() => users.id),
  isDeleted: boolean("is_deleted").default(false),
});

export const works = createTable("works", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  publishedDate: varchar("published_date"),
  // a pseudo-author should be created for anthology works and the hymns
  authorId: integer("author_id")
    .references(() => saints.id)
    .notNull(),
  // if a work is written by someone else and it contains a quote from a saint:
  authorName: varchar("author_name"),
  translatorName: varchar("translator_name"),
  editorName: varchar("editor_name"),
  isbn: varchar("isbn"),
  blurb: varchar("blurb"),
  // because users can submit works, they need to be approved before publically consumed.
  isApproved: boolean("is_approved").default(false).notNull(),
  createdDate: timestamp("created_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedBy: varchar("updated_by").references(() => users.id),
  isDeleted: boolean("is_deleted").default(false),
});

// each quote has a citation
export const citations = createTable("citations", {
  id: serial("id").primaryKey(),
  publicationCity: varchar("publication_city").notNull(),
  publicationYear: varchar("publication_year").notNull(),
  pageStart: integer("page_start").notNull(),
  pageEnd: integer("page_end").notNull(),
  // because users can submit citations, they need to be approved before publically consumed.
  isApproved: boolean("is_approved").default(false).notNull(),
  createdDate: timestamp("created_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedBy: varchar("updated_by").references(() => users.id),
  isDeleted: boolean("is_deleted").default(false),
  // dbdesigner includes "pg_pl: varchar" but there are no notes for what it might be.
});

export const quotes = createTable("quotes", {
  id: serial("id").primaryKey(),
  text: varchar("text").notNull(),
  authorId: integer("author_id")
    .references(() => saints.id)
    .notNull(),
  workId: integer("work_id")
    .references(() => works.id)
    .notNull(),
  citationId: integer("citation_id")
    .references(() => citations.id)
    .notNull(),
  isScripture: boolean("is_scripture").default(false).notNull(),
  isPrayer: boolean("is_prayer").default(false).notNull(),
  // id of the user who submitted the quote.
  submitId: varchar("submit_id")
    .references(() => users.id)
    .notNull(),
  // because users can submit works, they need to be approved before publically consumed.
  isApproved: boolean("is_approved").default(false).notNull(),
  createdDate: timestamp("created_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedBy: varchar("updated_by").references(() => users.id),
  isDeleted: boolean("is_deleted").default(false),
});

// user's collections of quotes
export const collections = createTable("collections", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  userId: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  createdDate: timestamp("created_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isDeleted: boolean("is_deleted").default(false),
});

// many to many quotes/collections table
export const quote_collections = createTable("quote_collections", {
  collectionId: integer("collection_id")
    .references(() => collections.id)
    .notNull(),
  quoteId: integer("quote_id")
    .references(() => quotes.id)
    .notNull(),
});

// these are categories of quotes/sayings: e.g. hope, faith, love, etc.
export const categories = createTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  // because uses can submit works, they need to be approved before publically consumed.
  isApproved: boolean("is_approved").default(false).notNull(),
  createdDate: timestamp("created_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedBy: varchar("updated_by").references(() => users.id),
  isDeleted: boolean("is_deleted").default(false),
});

// many to many quotes/categories table
export const quote_categories = createTable("quote_categories", {
  quoteId: integer("quote_id").references(() => quotes.id),
  categoryId: integer("category_id").references(() => categories.id),
});

// service refers to sayings and calendar apps and all data they own
// used for Work/Book cover photos, saint icons, and user profile pictures.
export const service_images = createTable("service_images", {
  id: serial("id").primaryKey(),
  url: varchar("url").notNull(),
  alt: varchar("alt").notNull(),
  // because uses can submit works, they need to be approved before publically consumed.
  isApproved: boolean("is_approved").default(false).notNull(),
  createdDate: timestamp("created_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedDate: timestamp("updated_date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedBy: varchar("updated_by").references(() => users.id),
});

// icons here refers to Orthodox Iconography depicting saints
export const icons = createTable("icons", {
  saintId: integer("saint_id").references(() => saints.id),
  iconId: integer("icon_id").references(() => service_images.id),
});

export const work_cover = createTable("work_cover", {
  workId: integer("work_id").references(() => works.id),
  coverId: integer("cover_id").references(() => service_images.id),
});
