import { type UseFormSetValue } from "react-hook-form";
import { type formSchema } from "./formSchema";
import { type z } from "zod";
import { isApostle, isBc, isBishop, isConfessor, isDeacon, isDeaconess, isDespot, isDuchess, isDuke, isEmperor, isEmpress, isEqualToApostle, isGrandPrince, isGrandPrincess, isKing, isLevite, isLxx, isMartyr, isMonk, isPassionBearer, isPatriarch, isPriest, isPrince, isPrincess, isProphet, isQueen } from "~/lib/constants";

type FormSetValue = UseFormSetValue<z.infer<typeof formSchema>>

function beforeChrist(setValue: FormSetValue) {
    // if the saint lived before the incarnation, then he isn't the following things too
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isEqualToApostle", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isConfessor", false);
    setValue("isPassionBearer", false);
    return setValue("isMonk", false);
  }

function prophet(setValue: FormSetValue) {
    setValue("isBc", true);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isEqualToApostle", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isConfessor", false);
    setValue("isPassionBearer", false);
    return setValue("isMonk", false);
  }

function levite(setValue: FormSetValue) {
    setValue("isBc", true);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isEqualToApostle", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isConfessor", false);
    setValue("isPassionBearer", false);
    return setValue("isMonk", false);
  }

function ofTheTwelveApostles(setValue: FormSetValue) {
    // if the saint is an Apostle, then he isn't the following things too
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isLxx", false);
    setValue("isEqualToApostle", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    setValue("isMonk", false);
    return setValue("isMale", true);
  }

function ofTheSeventyApostles(setValue: FormSetValue) {
    // if the saint is one of the 70, then he isn't the following things too
    setValue("isBc", false);
    setValue("isApostle", false);
    setValue("isEqualToApostle", false);
    setValue("isPatriarch", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    setValue("isMonk", false);
    return setValue("isMale", true);
  }

function equalToTheApostles(setValue: FormSetValue) {
    // if the saint is Equal to the Apostles, then he isn't the following things too
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    return setValue("isLxx", false);
  }

function patriarch(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function bishop(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isPatriarch", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function priest(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function deacon(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function deaconess(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    setValue("isMonk", false);
    return setValue("isMale", false);
  }

function despot(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function duchess(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", false);
  }

function duke(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function emperor(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function empress(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", false);
  }

function grandPrince(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function grandPrincess(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", false);
  }

function prince(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function princess(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isKing", false);
    setValue("isQueen", false);
    return setValue("isMale", false);
  }

function king(setValue: FormSetValue) {
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isQueen", false);
    return setValue("isMale", true);
  }

function queen(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    setValue("isLxx", false);
    setValue("isPatriarch", false);
    setValue("isBishop", false);
    setValue("isPriest", false);
    setValue("isDeacon", false);
    setValue("isDeaconess", false);
    setValue("isDespot", false);
    setValue("isDuchess", false);
    setValue("isDuke", false);
    setValue("isEmperor", false);
    setValue("isEmpress", false);
    setValue("isGrandPrince", false);
    setValue("isGrandPrincess", false);
    setValue("isPrince", false);
    setValue("isPrincess", false);
    setValue("isKing", false);
    return setValue("isMale", false);
  }

function monk(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isApostle", false);
    return setValue("isLxx", false);
  }

function martyr(setValue: FormSetValue) {
    setValue("isConfessor", false);
    return setValue("isPassionBearer", false);
  }

function confessor(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isMartyr", false);
    return setValue("isPassionBearer", false);
  }

function passionBearer(setValue: FormSetValue) {
    setValue("isBc", false);
    setValue("isProphet", false);
    setValue("isMartyr", false);
    return setValue("isConfessor", false);
  }

  export function saintLogic(field: string, setValue: FormSetValue) {
    switch(field) {
      case isBc:
        return beforeChrist(setValue);
      case isProphet:
        return prophet(setValue);
      case isLevite:
        return levite(setValue);
      case isApostle:
        return ofTheTwelveApostles(setValue);
      case isLxx:
        return ofTheSeventyApostles(setValue);
      case isEqualToApostle:
        return equalToTheApostles(setValue);
      case isPatriarch:
        return patriarch(setValue);
      case isBishop:
        return bishop(setValue);
      case isPriest:
        return priest(setValue);
      case isDeacon:
        return deacon(setValue);
      case isDeaconess:
        return deaconess(setValue);
      case isDespot:
        return despot(setValue);
      case isDuchess:
        return duchess(setValue);
      case isDuke:
        return duke(setValue);
      case isEmperor:
        return emperor(setValue);
      case isEmpress:
        return empress(setValue);
      case isGrandPrince:
        return grandPrince(setValue);
      case isGrandPrincess:
        return grandPrincess(setValue);
      case isPrince:
        return prince(setValue);
      case isPrincess:
        return princess(setValue);
      case isKing:
        return king(setValue);
      case isQueen:
        return queen(setValue);
      case isMonk:
        return monk(setValue);
      case isMartyr:
        return martyr(setValue);
      case isConfessor:
        return confessor(setValue);
      case isPassionBearer:
        return passionBearer(setValue);
    }
  }
  