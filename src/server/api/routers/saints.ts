import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { saints } from "~/server/db/schema";
 
export const saintRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({
    name: z.string().min(1),
    isBc: z.boolean(),
    feastDate: z.object({ month: z.number(), day: z.number()}),
  })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(saints).values({
      name: input.name,
      isBc: input.isBc,
      feastDate: `${input.feastDate.month}/${input.feastDate.day}`,
    })
  })
});