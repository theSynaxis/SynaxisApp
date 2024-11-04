import { type UseFormSetValue } from "react-hook-form";
import { type formSchema } from "./formSchema";
import { type z } from "zod";
import {
  isApostle,
  isBc,
  isBishop,
  isConfessor,
  isDeacon,
  isDeaconess,
  isDespot,
  isDuchess,
  isDuke,
  isEmperor,
  isEmpress,
  isEqualToApostle,
  isFoolForChrist,
  isGrandPrince,
  isGrandPrincess,
  isKing,
  isLevite,
  isLxx,
  isMartyr,
  isMonk,
  isPassionBearer,
  isPatriarch,
  isPriest,
  isPrince,
  isPrincess,
  isProphet,
  isQueen,
} from "~/lib/constants";
import {
  apostleValues,
  bcValues,
  bishopValues,
  confessorValues,
  deaconValues,
  deaconessValues,
  despotValues,
  duchessValues,
  dukeValues,
  emperorValues,
  empressValues,
  equalToTheApostlesValues,
  foolForChristValues,
  grandPrinceValues,
  grandPrincessValues,
  kingValues,
  leviteValues,
  lxxValues,
  martyrValues,
  monkValues,
  passionBearerValues,
  patriarchValues,
  priestValues,
  princeValues,
  princessValues,
  prophetValues,
  queenValues,
} from "./saint-values";

type FormSetValue = UseFormSetValue<z.infer<typeof formSchema>>;

export function saintLogic(field: string, setValue: FormSetValue) {
  switch (field) {
    case isBc:
      return bcValues.map((value) => setValue(value.field, value.setTo));
    case isProphet:
      return prophetValues.map((value) => setValue(value.field, value.setTo));
    case isLevite:
      return leviteValues.map((value) => setValue(value.field, value.setTo));
    case isApostle:
      return apostleValues.map((value) => setValue(value.field, value.setTo));
    case isLxx:
      return lxxValues.map((value) => setValue(value.field, value.setTo));
    case isEqualToApostle:
      return equalToTheApostlesValues.map((value) =>
        setValue(value.field, value.setTo),
      );
    case isPatriarch:
      return patriarchValues.map((value) => setValue(value.field, value.setTo));
    case isBishop:
      return bishopValues.map((value) => setValue(value.field, value.setTo));
    case isPriest:
      return priestValues.map((value) => setValue(value.field, value.setTo));
    case isDeacon:
      return deaconValues.map((value) => setValue(value.field, value.setTo));
    case isDeaconess:
      return deaconessValues.map((value) => setValue(value.field, value.setTo));
    case isDespot:
      return despotValues.map((value) => setValue(value.field, value.setTo));
    case isDuchess:
      return duchessValues.map((value) => setValue(value.field, value.setTo));
    case isDuke:
      return dukeValues.map((value) => setValue(value.field, value.setTo));
    case isEmperor:
      return emperorValues.map((value) => setValue(value.field, value.setTo));
    case isEmpress:
      return empressValues.map((value) => setValue(value.field, value.setTo));
    case isGrandPrince:
      return grandPrinceValues.map((value) =>
        setValue(value.field, value.setTo),
      );
    case isGrandPrincess:
      return grandPrincessValues.map((value) =>
        setValue(value.field, value.setTo),
      );
    case isPrince:
      return princeValues.map((value) => setValue(value.field, value.setTo));
    case isPrincess:
      return princessValues.map((value) => setValue(value.field, value.setTo));
    case isKing:
      return kingValues.map((value) => setValue(value.field, value.setTo));
    case isQueen:
      return queenValues.map((value) => setValue(value.field, value.setTo));
    case isMonk:
      return monkValues.map((value) => setValue(value.field, value.setTo));
    case isMartyr:
      return martyrValues.map((value) => setValue(value.field, value.setTo));
    case isConfessor:
      return confessorValues.map((value) => setValue(value.field, value.setTo));
    case isPassionBearer:
      return passionBearerValues.map((value) =>
        setValue(value.field, value.setTo),
      );
    case isFoolForChrist:
      return foolForChristValues.map((value) => {
        setValue(value.field, value.setTo);
      });
  }
}
