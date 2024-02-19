import { z } from "zod";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
 
export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ username: z.string().min(1), email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const usernameTaken = await ctx.db
        .select({ username: users.username })
        .from(users)
        .where(eq(users.username, input.username));
      const emailTaken = await ctx.db
        .select({ email: users.email })
        .from(users)
        .where(eq(users.email, input.email));

      if(usernameTaken?.[0]?.username) {
        throw new TRPCError({ code: "UNPROCESSABLE_CONTENT", message: "Username taken." })
      }

      if(emailTaken?.[0]?.email) {
        throw new TRPCError({ code: "UNPROCESSABLE_CONTENT", message: "Email taken." })
      }

      await ctx.db.insert(users).values({
        username: input.username,
        email: input.email,
        password: hashedPassword,
      });
    }),
});
