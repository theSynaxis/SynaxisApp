import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { saints } from "~/server/db/schema";
 
export const saintRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      name: z.string().min(1), 
      life: z.string().nullable(),
      isPatriarch: z.boolean().nullable(),
      isBishop: z.boolean().nullable(),
      isPriest: z.boolean().nullable(),
      isDeacon: z.boolean().nullable(),
      isElder: z.boolean().nullable(),
      isMonk: z.boolean().nullable(),
      isProphet: z.boolean().nullable(),
      isRuler: z.boolean().nullable(),
      isMarried: z.boolean().nullable(),
      isLayman: z.boolean().nullable(),
      yearBorn: z.number().nullable(),
      yearDied: z.number().nullable(),
      isBc: z.boolean(),
      feastDate: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(saints).values({
        name: input.name,
        life: input.life,
        isPatriarch: input.isPatriarch ?? false,
        isBishop: input.isBishop ?? false,
        isPriest: input.isPriest ?? false,
        isDeacon: input.isDeacon ?? false,
        isElder: input.isElder ?? false,
        isMonk: input.isMonk ?? false,
        isProphet: input.isProphet ?? false,
        isRuler: input.isRuler ?? false,
        isMarried: input.isMarried ?? false,
        isLayman: input.isLayman ?? false,
        yearBorn: input.yearBorn,
        yearDied: input.yearDied,
        isBc: input.isBc ?? false,
        feastDate: input.feastDate,
      });
    }),
});
