import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { saints } from "~/server/db/schema";
import {
  BISHOP,
  CONFESSOR,
  DEACON,
  DEACONESS,
  DESPOT,
  DUCHESS,
  DUKE,
  EMPEROR,
  EMPRESS,
  EQUAL_TO_THE_APOSTLES,
  GRAND_PRINCE,
  GRAND_PRINCESS,
  GREAT_SAINTS_DAY,
  KING,
  MARTYR,
  OF_CHRIST_AND_THEOTOKOS,
  PASSION_BEARER,
  PATRIARCH,
  PRIEST,
  PRINCE,
  PRINCESS,
  PROPHET,
  QUEEN,
  SAINT_WITH_GREAT_DOXOLOGY,
  SAINT_WITH_SERVICE,
  SEVENTY_APOSTLES,
  SIMPLE_COMMEMORATION,
  TWELVE_APOSTLES,
} from "~/lib/constants";
import { eq } from "drizzle-orm";
import { todayAsNumbers } from "~/lib/utils";

export const saintRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        isBc: z.boolean(),
        feastDate: z.object({ month: z.number(), day: z.number() }),
        feastType: z.union([
          z.literal(OF_CHRIST_AND_THEOTOKOS),
          z.literal(GREAT_SAINTS_DAY),
          z.literal(SAINT_WITH_GREAT_DOXOLOGY),
          z.literal(SAINT_WITH_SERVICE),
          z.literal(SIMPLE_COMMEMORATION),
        ]),
        apostle: z
          .union([
            z.literal(TWELVE_APOSTLES),
            z.literal(SEVENTY_APOSTLES),
            z.literal(EQUAL_TO_THE_APOSTLES),
          ])
          .nullable(),
        clergy: z
          .union([
            z.literal(PATRIARCH),
            z.literal(BISHOP),
            z.literal(PRIEST),
            z.literal(DEACON),
            z.literal(DEACONESS),
            z.literal(PROPHET),
          ])
          .nullable(),
        royal: z
          .union([
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
          ])
          .nullable(),
        martyr: z
          .union([
            z.literal(MARTYR),
            z.literal(CONFESSOR),
            z.literal(PASSION_BEARER),
          ])
          .nullable(),
        isMonk: z.boolean(),
        isMarried: z.boolean(),
        isMale: z.boolean(),
        isLevite: z.boolean(),
        isFoolForChrist: z.boolean(),
        yearBorn: z.number().nullable(),
        yearDied: z.number().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(saints).values({
        name: input.name,
        isBc: input.isBc,
        feastDate: `${input.feastDate.month}/${input.feastDate.day}`,
        feastType: input.feastType,
        apostle: input.apostle,
        clergy: input.clergy,
        royal: input.royal,
        martyr: input.martyr,
        isMonk: input.isMonk,
        isMarried: input.isMarried,
        isMale: input.isMale,
        isLevite: input.isLevite,
        isFoolForChrist: input.isFoolForChrist,
        yearBorn: input.yearBorn,
        yearDied: input.yearDied,
      });
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.db.select().from(saints);
    return items;
  }),
  dailySaints: publicProcedure.query(async ({ ctx }) => {
    const saintsOfTheDay = await ctx.db
      .select()
      .from(saints)
      .where(eq(saints.feastDate, todayAsNumbers));
    return saintsOfTheDay;
  }),
});
