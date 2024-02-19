import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { collections } from "~/server/db/schema";
 
export const collectionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      name: z.string().min(1),
      userId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(collections).values({
        name: input.name,
        userId: input.userId,
      });
    }),
});
