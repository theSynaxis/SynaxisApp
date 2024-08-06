import { z } from "zod";
import {
  GREAT_SAINTS_DAY,
  OF_CHRIST_AND_THEOTOKOS,
  SAINT_WITH_GREAT_DOXOLOGY,
  SAINT_WITH_SERVICE,
  SIMPLE_COMMEMORATION,
} from "~/lib/constants";

export const formSchema = z.object({
  name: z.string().min(3),
  isBc: z.boolean(),
  feastDate: z.object({
    month: z.coerce.number().min(1).max(12),
    day: z.coerce.number().min(1).max(31),
  }),
  feastType: z.union([
    z.literal(OF_CHRIST_AND_THEOTOKOS),
    z.literal(GREAT_SAINTS_DAY),
    z.literal(SAINT_WITH_GREAT_DOXOLOGY),
    z.literal(SAINT_WITH_SERVICE),
    z.literal(SIMPLE_COMMEMORATION),
  ]),
  yearBorn: z
    .union([z.coerce.number().int().positive().min(1), z.nan()])
    .optional(),
  yearDied: z
    .union([z.coerce.number().int().positive().min(1), z.nan()])
    .optional(),
  isProphet: z.boolean(),
  isApostle: z.boolean(),
  isLxx: z.boolean(),
  isEqualToApostle: z.boolean(),
  isPatriarch: z.boolean(),
  isBishop: z.boolean(),
  isPriest: z.boolean(),
  isDeacon: z.boolean(),
  isDeaconess: z.boolean(),
  isDespot: z.boolean(),
  isDuchess: z.boolean(),
  isDuke: z.boolean(),
  isEmperor: z.boolean(),
  isEmpress: z.boolean(),
  isGrandPrince: z.boolean(),
  isGrandPrincess: z.boolean(),
  isPrince: z.boolean(),
  isPrincess: z.boolean(),
  isKing: z.boolean(),
  isQueen: z.boolean(),
  isMartyr: z.boolean(),
  isConfessor: z.boolean(),
  isPassionBearer: z.boolean(),
  isMonk: z.boolean(),
  isMarried: z.boolean(),
  isMale: z.boolean(),
  isLevite: z.boolean(),
  isFoolForChrist: z.boolean(),
});
