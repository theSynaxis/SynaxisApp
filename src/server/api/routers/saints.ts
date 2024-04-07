import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { saints } from "~/server/db/schema";
import {
  EQUAL_TO_THE_APOSTLES,
  SEVENTY_APOSTLES,
  TWELVE_APOSTLES,
} from "~/lib/constants";
 
export const saintRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({
    name: z.string().min(1),
    isBc: z.boolean(),
    feastDate: z.object({ month: z.number(), day: z.number()}),
    apostle: z.union([
      z.literal(TWELVE_APOSTLES),
      z.literal(SEVENTY_APOSTLES),
      z.literal(EQUAL_TO_THE_APOSTLES),
    ]).nullable(),
  })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(saints).values({
      name: input.name,
      isBc: input.isBc,
      feastDate: `${input.feastDate.month}/${input.feastDate.day}`,
      apostle: input.apostle,
    })
  })
});