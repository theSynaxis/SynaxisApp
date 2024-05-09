import { z } from "zod";

export const formSchema = z.object({
  text: z.string().min(1),
  saint: z.number(),
  citation: z.object({
    book: z.object({
      title: z.string(),
      authors: z.array(z.string()),
    }),
    publicationCity: z.string().min(1),
    publicationYear: z.string().min(1),
    pageStart: z.string().min(1),
    pageEnd: z.string().min(1),
  }),
});
