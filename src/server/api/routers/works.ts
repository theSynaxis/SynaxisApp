import { z } from "zod";

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
});
