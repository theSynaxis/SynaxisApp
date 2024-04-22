import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { works } from "~/server/db/schema";

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

export const workRouter = createTRPCRouter({
  isbnSearch: publicProcedure
    .input(
      z.object({
        isbn: z.union([z.string().min(10).max(10), z.string().min(13).max(13)]),
      }),
    )
    .mutation(async ({ input }) => {
      // const isbn = "9780881416817";
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${input.isbn}`;

      const response = await fetch(url);
      const data = (await response.json()) as GoogleBooksApi;
      return data.items[0];
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        authorId: z.number(),
        publishedDate: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(works).values({
        title: input.title,
        authorId: input.authorId,
        publishedDate: input.publishedDate,
      });
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
