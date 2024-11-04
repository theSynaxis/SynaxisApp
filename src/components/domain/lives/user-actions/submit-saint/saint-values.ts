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
  isMale,
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

type field =
  | typeof isApostle
  | typeof isBc
  | typeof isBishop
  | typeof isConfessor
  | typeof isDeacon
  | typeof isDeaconess
  | typeof isDespot
  | typeof isDuchess
  | typeof isDuke
  | typeof isEmperor
  | typeof isEmpress
  | typeof isEqualToApostle
  | typeof isGrandPrince
  | typeof isGrandPrincess
  | typeof isKing
  | typeof isLevite
  | typeof isLxx
  | typeof isMale
  | typeof isMartyr
  | typeof isMonk
  | typeof isPassionBearer
  | typeof isPatriarch
  | typeof isPriest
  | typeof isPrince
  | typeof isPrincess
  | typeof isProphet
  | typeof isQueen
  | typeof isFoolForChrist;

type Values = { field: field; setTo: boolean }[];

export const bcValues: Values = [
  // if the saint lived before the incarnation, then he isn't the following things too
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isEqualToApostle,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isConfessor,
    setTo: false,
  },
  {
    field: isPassionBearer,
    setTo: false,
  },
  {
    field: isMonk,
    setTo: false,
  },
  {
    field: isFoolForChrist,
    setTo: false,
  },
];
export const prophetValues: Values = [
  {
    field: isBc,
    setTo: true,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isEqualToApostle,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isConfessor,
    setTo: false,
  },
  {
    field: isPassionBearer,
    setTo: false,
  },
  {
    field: isMonk,
    setTo: false,
  },
  {
    field: isFoolForChrist,
    setTo: false,
  },
];

export const leviteValues: Values = [
  {
    field: isBc,
    setTo: true,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isEqualToApostle,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isConfessor,
    setTo: false,
  },
  {
    field: isPassionBearer,
    setTo: false,
  },

  {
    field: isMonk,
    setTo: false,
  },
  {
    field: isFoolForChrist,
    setTo: false,
  },
];

export const apostleValues: Values = [
  // if the saint is an Apostle, then he isn't the following things too
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isEqualToApostle,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMonk,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
  {
    field: isFoolForChrist,
    setTo: false,
  },
];

export const lxxValues: Values = [
  // if the saint is one of the 70, then he isn't the following things too
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isEqualToApostle,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMonk,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
  {
    field: isFoolForChrist,
    setTo: false,
  },
];

export const equalToTheApostlesValues: Values = [
  // if the saint is Equal to the Apostles, then he isn't the following things too
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
];

export const patriarchValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const bishopValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const priestValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const deaconValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const deaconessValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMonk,
    setTo: false,
  },
  {
    field: isMale,
    setTo: false,
  },
];

export const despotValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const duchessValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: false,
  },
];

export const dukeValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const emperorValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const empressValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: false,
  },
];

export const grandPrinceValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const grandPrincessValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: false,
  },
];

export const princeValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const princessValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: false,
  },
];

export const kingValues: Values = [
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isQueen,
    setTo: false,
  },
  {
    field: isMale,
    setTo: true,
  },
];

export const queenValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
  {
    field: isPatriarch,
    setTo: false,
  },
  {
    field: isBishop,
    setTo: false,
  },
  {
    field: isPriest,
    setTo: false,
  },
  {
    field: isDeacon,
    setTo: false,
  },
  {
    field: isDeaconess,
    setTo: false,
  },
  {
    field: isDespot,
    setTo: false,
  },
  {
    field: isDuchess,
    setTo: false,
  },
  {
    field: isDuke,
    setTo: false,
  },
  {
    field: isEmperor,
    setTo: false,
  },
  {
    field: isEmpress,
    setTo: false,
  },
  {
    field: isGrandPrince,
    setTo: false,
  },
  {
    field: isGrandPrincess,
    setTo: false,
  },
  {
    field: isPrince,
    setTo: false,
  },
  {
    field: isPrincess,
    setTo: false,
  },
  {
    field: isKing,
    setTo: false,
  },

  {
    field: isMale,
    setTo: false,
  },
];

export const monkValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
];

export const martyrValues: Values = [
  {
    field: isConfessor,
    setTo: false,
  },
  {
    field: isPassionBearer,
    setTo: false,
  },
];

export const confessorValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isMartyr,
    setTo: false,
  },
  {
    field: isPassionBearer,
    setTo: false,
  },
];

export const passionBearerValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isMartyr,
    setTo: false,
  },
  {
    field: isConfessor,
    setTo: false,
  },
];

export const foolForChristValues: Values = [
  {
    field: isBc,
    setTo: false,
  },
  {
    field: isProphet,
    setTo: false,
  },
  {
    field: isLevite,
    setTo: false,
  },
  {
    field: isApostle,
    setTo: false,
  },
  {
    field: isLxx,
    setTo: false,
  },
];
