import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { quotes } from "~/server/db/schema";
 
export const quoteRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      text: z.string().min(1),
      authorId: z.number(),
      workId: z.number(),
      citationId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(quotes).values({
        text: input.text,
        authorId: input.authorId,
        workId: input.workId,
        citationId: input.citationId
      });
    }),
  updateApproval: publicProcedure
    .input(z.object({ 
        id: z.number(),
        isApproved: z.boolean()
    }))
    .mutation(async ( { ctx, input }) => {
        await ctx.db
            .update(quotes)
            .set({
                isApproved: input.isApproved,
            })
            .where(eq(quotes.id, input.id))
    })
});
