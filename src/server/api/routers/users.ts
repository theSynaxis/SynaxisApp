import { z } from "zod";
import bcrypt from 'bcrypt';

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
 
export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ username: z.string().min(1), email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      await ctx.db.insert(users).values({
        username: input.username,
        email: input.email,
        password: hashedPassword,
      });
    }),
});
