import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { parishes } from "~/server/db/schema";
 
export const parishRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
      name: z.string().min(1), 
      adminId: z.number(), 
      isMonastery: z.boolean().nullable(), 
      jurisdiction: z.string().min(1), 
      diocese: z.string(), 
      priest: z.string().nullable(), 
      bishop: z.string(), 
      patronalFeast: z.string().nullable(), 
      streetAddress: z.string(), 
      city: z.string(), 
      state: z.string(), 
      zipCode: z.string(), 
      website: z.string().nullable(), 
      googleCalendarId: z.string().nullable(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(parishes).values({
        name: input.name,
        adminId: input.adminId,
        isMonastery: input.isMonastery ?? false,
        jurisdiction: input.jurisdiction, 
        diocese: input.diocese, 
        priest: input.priest,
        bishop: input.bishop,
        patronalFeast: input.patronalFeast, 
        streetAddress: input.streetAddress, 
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
        website: input.website,
        googleCalendarId: input.googleCalendarId,
      });
    }),
});
