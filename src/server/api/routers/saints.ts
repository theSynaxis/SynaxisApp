import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { saints } from "~/server/db/schema";
import {
  BISHOP,
  DEACON,
  EQUAL_TO_THE_APOSTLES,
  PATRIARCH,
  PRIEST,
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
    clergy: z.union([
      z.literal(PATRIARCH),
      z.literal(BISHOP),
      z.literal(PRIEST),
      z.literal(DEACON),
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