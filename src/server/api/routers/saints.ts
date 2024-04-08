import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { saints } from "~/server/db/schema";
import {
  BISHOP,
  DEACON,
  DESPOT,
  DUCHESS,
  DUKE,
  EMPEROR,
  EMPRESS,
  EQUAL_TO_THE_APOSTLES,
  GRAND_PRINCE,
  GRAND_PRINCESS,
  KING,
  PATRIARCH,
  PRIEST,
  PRINCE,
  PRINCESS,
  QUEEN,
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
    royal: z.union([
      z.literal(DESPOT),
      z.literal(DUCHESS),
      z.literal(DUKE),
      z.literal(EMPEROR),
      z.literal(EMPRESS),
      z.literal(GRAND_PRINCE),
      z.literal(GRAND_PRINCESS),
      z.literal(KING),
      z.literal(PRINCE),
      z.literal(PRINCESS),
      z.literal(QUEEN),
    ]).nullable(),
  })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(saints).values({
      name: input.name,
      isBc: input.isBc,
      feastDate: `${input.feastDate.month}/${input.feastDate.day}`,
      apostle: input.apostle,
      clergy: input.clergy,
      royal: input.royal,
    })
  })
});