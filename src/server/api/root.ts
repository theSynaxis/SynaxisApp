import { createTRPCRouter } from "~/server/api/trpc";

// import routes
import { categoryRouter } from "~/server/api/routers/categories";
import { citationRouter } from "~/server/api/routers/citations";
import { collectionRouter } from "~/server/api/routers/collections";
import { quoteRouter } from "~/server/api/routers/quotes";
import { parishRouter } from "~/server/api/routers/parishes";
import { saintRouter } from "~/server/api/routers/saints";
import { serviceImagesRouter } from "./routers/service-images";
import { userRouter } from "~/server/api/routers/users";
import { workRouter } from "~/server/api/routers/works";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // alphabetical order
  category: categoryRouter,
  citation: citationRouter,
  collection: collectionRouter,
  parish: parishRouter,
  quote: quoteRouter,
  saint: saintRouter,
  serviceImages: serviceImagesRouter,
  user: userRouter,
  work: workRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
