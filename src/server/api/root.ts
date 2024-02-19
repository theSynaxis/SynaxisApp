import { createTRPCRouter } from "~/server/api/trpc";

// import routes
import { userRouter } from "~/server/api/routers/users";
import { parishRouter } from "~/server/api/routers/parishes";
import { saintRouter } from "~/server/api/routers/saints";
import { workRouter } from "~/server/api/routers/works";
import { citationRouter } from "~/server/api/routers/citations";
import { categoryRouter } from "~/server/api/routers/categories";
import { collectionRouter } from "~/server/api/routers/collections";
import { quoteRouter } from "~/server/api/routers/quotes";

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
  category: categoryRouter,
  collection: collectionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
