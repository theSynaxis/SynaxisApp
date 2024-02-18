import { userRouter } from "~/server/api/routers/users";
import { parishRouter } from "~/server/api/routers/parishes";
import { saintRouter } from "~/server/api/routers/saints";
import { workRouter } from "~/server/api/routers/works";
import { citationRouter } from "~/server/api/routers/citations";
import { quoteRouter } from "~/server/api/routers/quotes";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  parish: parishRouter,
  saint: saintRouter,
  work: workRouter,
  citation: citationRouter,
  quote: quoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
