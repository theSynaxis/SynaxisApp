import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { categories } from "~/server/db/schema";
 
export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      name: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(categories).values({
        name: input.name,
      });
    }),
    updateApproval: publicProcedure
    .input(z.object({ 
        id: z.number(),
        isApproved: z.boolean()
    }))
    .mutation(async ( { ctx, input }) => {
        await ctx.db
            .update(categories)
            .set({
                isApproved: input.isApproved,
            })
            .where(eq(categories.id, input.id))
    })
});
