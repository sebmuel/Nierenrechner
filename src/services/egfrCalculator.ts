import { type CreatinineUnit, type GenderTypes, type SkinColor } from "../types.ts";
import { logger } from "./debugger-logger.ts";
import { GenderFactors } from "../constants/genderFactors.ts";
import { SkinColorFactors } from "../constants/skinColorFactors.ts";
import { GfrResult } from "../classes/GfrResult.ts";

export class EgfrCalculator {
  public calculateMdrd(
    serumCreatinine: number,
    unit: CreatinineUnit,
    age: number,
    gender: GenderTypes,
    skinColor: SkinColor
  ) {
    serumCreatinine = this.convertSerumCreatinineUnit(serumCreatinine, unit);
    const genderFactors = GenderFactors[gender];
    const skinColorFactors = SkinColorFactors[skinColor];

    const result =
      186 *
      Math.pow(serumCreatinine, -1.154) *
      Math.pow(age, -0.203) *
      genderFactors.mdrd *
      skinColorFactors.mdrd;

    return new GfrResult(Math.round(result * 100) / 100, "ml/min/1.73m²", "MDRD");
  }

  public calculateMayoQuadratic(
    serumCreatinine: number,
    unit: CreatinineUnit,
    age: number,
    gender: GenderTypes
  ) {
    serumCreatinine = this.convertSerumCreatinineUnit(serumCreatinine, unit);
    const genderFactors = GenderFactors[gender];

    const exponent =
      1.911 +
      5.249 / serumCreatinine -
      2.114 / serumCreatinine ** 2 -
      0.00686 * age -
      genderFactors.mayoQuadratic;

    let result = Math.exp(exponent);
    logger.log("result " + result);
    return new GfrResult(Math.round(result * 100) / 100, "mL/min/1.73m²", "Mayo");
  }

  public calculateCkdEpi(serumCreatinine: number, unit: CreatinineUnit, age: number, gender: GenderTypes) {
    serumCreatinine = this.convertSerumCreatinineUnit(serumCreatinine, unit);
    const genderFactors = GenderFactors[gender];
    const scOverK = serumCreatinine / genderFactors.ckdEpiK;
    const minTerm = Math.min(scOverK, 1);
    const maxTerm = Math.max(scOverK, 1);

    const result =
      142 * minTerm ** genderFactors.ckdEpiA * maxTerm ** -1.2 * 0.9938 ** age * genderFactors.ckdEpi;

    return new GfrResult(Math.round(result * 100) / 100, "mL/min/1.73m²", "CKD-EPI");
  }

  public calculateCkdEpiForCystatin(cystatin: number, age: number, gender: GenderTypes) {
    const genderFactors = GenderFactors[gender];
    const cysOverK = cystatin / 0.8;
    const minTerm = Math.min(cysOverK, 1);
    const maxTerm = Math.max(cysOverK, 1);

    let result = 133 * minTerm ** -0.499 * maxTerm ** -1.328 * 0.996 ** age * genderFactors.ckdEpiCys;

    return new GfrResult(Math.round(result * 100) / 100, "ml/min/1.73m²", "CKD-EPI");
  }

  public calculateCockcroftGault(
    serumCreatinine: number,
    unit: CreatinineUnit,
    age: number,
    gender: GenderTypes,
    weight: number
  ) {
    serumCreatinine = this.convertSerumCreatinineUnit(serumCreatinine, unit);
    const genderFactors = GenderFactors[gender];
    const ageResult = 140 - age;
    const weightResult = weight / 72;

    const result = (ageResult / serumCreatinine) * weightResult * genderFactors.cockcroftGault;

    return new GfrResult(Math.round(result * 100) / 100, "ml/min", "Cockcroft-Gault");
  }

  private convertSerumCreatinineUnit(serumCreatinine: number, unit: CreatinineUnit) {
    if (unit === "µmol/l") {
      serumCreatinine = serumCreatinine / 88.42;
      logger.log(`Converted SerumCreatinine to ${serumCreatinine} mg/dl`);
    }
    return serumCreatinine;
  }
}
