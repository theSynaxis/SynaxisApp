import { z } from "zod";

export const formSchema = z.object({
  saint: z.number(),
  firstName: z.string().min(2),
  lastName: z.string().min(1),
});
