import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { works } from "~/server/db/schema";
  
export const workRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      title: z.string().min(1),
      authorId: z.number(),
      publishedDate: z.string().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(works).values({
        title: input.title,
        authorId: input.authorId,
        publishedDate: input.publishedDate,
      });
    }),
  updateApproval: publicProcedure
    .input(z.object({ 
        id: z.number(),
        isApproved: z.boolean()
    }))
    .mutation(async ( { ctx, input }) => {
        await ctx.db
            .update(works)
            .set({
                isApproved: input.isApproved,
            })
            .where(eq(works.id, input.id))
    })
});
