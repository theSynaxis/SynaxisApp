import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { service_images } from "~/server/db/schema";
 
export const serviceImagesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
        url: z.string().min(1),
        alt: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(service_images).values({
        url: input.url,
        alt: input.alt,
      });
    }),
    updateApproval: publicProcedure
    .input(z.object({ 
        id: z.number(),
        isApproved: z.boolean()
    }))
    .mutation(async ( { ctx, input }) => {
        await ctx.db
            .update(service_images)
            .set({
                isApproved: input.isApproved,
            })
            .where(eq(service_images.id, input.id))
    })
});
