import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { works } from "~/server/db/schema";
import { isbnSearch } from "../helpers";

export const workRouter = createTRPCRouter({
  isbnSearch: publicProcedure
    .input(
      z.object({
        isbn: z.union([z.string().min(10).max(10), z.string().min(13).max(13)]),
      }),
    )
    .mutation(async ({ input }) => {
      const book = await isbnSearch(input);
      return {
        title: book.title,
        authors: book.authors,
        blurb: book.blurb,
        coverImage: book.coverImage,
        publisher: book.publisher,
        publicationYear: book.publicationYear,
        publicationCity: book.publicationCity,
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        authors: z.array(z.string()),
        isbn: z.union([z.string().min(10).max(10), z.string().min(13).max(13)]),
        authorId: z.number().nullable(),
        coverImage: z.string(),
        blurb: z.string().nullable(),
        publisher: z.string(),
        publicationCity: z.string(),
        publicationYear: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(works).values({
        title: input.title,
        authorId: input.authorId,
        authors: input.authors,
        isbn: input.isbn,
        blurb: input.blurb,
        coverImage: input.coverImage,
        publisher: input.publisher,
        publicationCity: input.publicationCity,
        publicationYear: input.publicationYear,
      });

      // return for toast success message
      const book = await ctx.db
        .select()
        .from(works)
        .where(eq(works.isbn, input.isbn));
      return book[0];
    }),
  updateApproval: publicProcedure // TODO: modProcedure
    .input(
      z.object({
        id: z.number(),
        isApproved: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(works)
        .set({
          isApproved: input.isApproved,
        })
        .where(eq(works.id, input.id));
    }),
});
