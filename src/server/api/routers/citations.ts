import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { citations } from "~/server/db/schema";
 
export const citationRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      publicationCity: z.string().min(1),
      publicationYear: z.string().min(1),
      pageStart: z.string().min(1),
      pageEnd: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(citations).values({
        publicationCity: input.publicationCity,
        publicationYear: input.publicationYear,
        pageStart: input.pageStart,
        pageEnd: input.pageEnd,
      });
    }),
});
