import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { works } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";

interface GoogleBooksApiItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    industryIdentifiers: { type: string; identifier: string }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
}

interface GoogleBooksApi {
  kind: string;
  totalItems: number;
  items: GoogleBooksApiItem[];
}

interface BookCover {
  url: string;
}

export const workRouter = createTRPCRouter({
  isbnSearch: publicProcedure
    .input(
      z.object({
        isbn: z.union([z.string().min(10).max(10), z.string().min(13).max(13)]),
      }),
    )
    .mutation(async ({ input }) => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${input.isbn}`;

      const response = await fetch(url);
      const data = (await response.json()) as GoogleBooksApi;
      const book = data.items[0];

      if (!book) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find book with the ISBN provided.",
        });
      }

      // search for book cover url after finding book:
      const coverIsbn =
        input.isbn.length === 13 && input.isbn.includes("978")
          ? `978-${input.isbn.substring(3)}` // if ISBN-13, add hiphen after 978
          : `978-${input.isbn}`; // if ISBN-10, add 978- before number

      const coverUrl = `http://bookcover.longitood.com/bookcover/${coverIsbn}`;
      const coverResponse = await fetch(coverUrl);
      const coverData = (await coverResponse.json()) as BookCover;

      return {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publishedDate: book.volumeInfo.publishedDate,
        coverImage: coverData.url,
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        authors: z.array(z.string()),
        isbn: z.union([z.string().min(10).max(10), z.string().min(13).max(13)]),
        authorId: z.number().nullable(),
        publishedDate: z.string(),
        coverImage: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(works).values({
        title: input.title,
        isbn: input.isbn,
        authorId: input.authorId,
        publishedDate: input.publishedDate,
        authors: input.authors,
        coverImage: input.coverImage,
      });

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
