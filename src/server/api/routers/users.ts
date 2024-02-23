import { z } from "zod";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { generateId } from "lucia";

// import components
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { lucia } from '~/server/api/auth';

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
        id: generateId(15),
        username: input.username,
        email: input.email,
        password: hashedPassword,
      });
    }),
  login: publicProcedure
    .input(z.object({ 
      usernameOrEmail: z.string(),
      password: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const userByUsername = await ctx.db
        .select()
        .from(users)
        .where(eq(users.username, input.usernameOrEmail));

      if (userByUsername?.[0]?.password) {
        const passwordMatches = await bcrypt.compare(input.password, userByUsername[0].password);

        if (!passwordMatches) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Invalid Credentials." })
        }

        const session = await lucia.createSession(userByUsername[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        return sessionCookie
      }

      const userByEmail = await ctx.db
        .select()
        .from(users)
        .where(eq(users.email, input.usernameOrEmail));

      if (userByEmail?.[0]?.password) {
        const passwordMatches = await bcrypt.compare(input.password, userByEmail[0].password);

        if (!passwordMatches) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Invalid Credentials." })
        }
        
        const session = await lucia.createSession(userByEmail[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        return sessionCookie
      }
      
      throw new TRPCError({ code: "NOT_FOUND", message: "Invalid Credentials." })
    }),
});
