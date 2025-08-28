import {type CreatinineUnit, type GenderTypes, type SkinColor} from "../types.ts";
import {logger} from "./debugger-logger.ts";
import {GenderFactors} from "../constants/genderFactors.ts";
import {SkinColorFactors} from "../constants/skinColorFactors.ts";
import {GfrResult} from "../classes/GfrResult.ts";

export class EgfrCalculator {
    public calculateMdrd(
        serumCreatinine: number,
        unit: CreatinineUnit,
        age: number,
        gender: GenderTypes,
        skinColor: SkinColor,
        weight: number,
        height: number
    ) {
        serumCreatinine = this.convertSerumCreatinineUnit(serumCreatinine, unit);
        const genderFactors = GenderFactors[gender];
        const skinColorFactors = SkinColorFactors[skinColor];

        let result =
            186 *
            Math.pow(serumCreatinine, -1.154) *
            Math.pow(age, -0.203) *
            genderFactors.mdrd *
            skinColorFactors.mdrd;

        if (!isNaN(weight) && !isNaN(height)) {
            const bodySurface = this.calculateBodySurface(age, weight, height);
            result = result * bodySurface / 1.73;
            return new GfrResult(Math.round(result * 100) / 100, "mL/min", "Mayo");
        }

        return new GfrResult(Math.round(result * 100) / 100, "ml/min/1.73m²", "MDRD");
    }

    public calculateMayoQuadratic(
        serumCreatinine: number,
        unit: CreatinineUnit,
        age: number,
        gender: GenderTypes,
        weight: number,
        height: number
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

        if (!isNaN(weight) && !isNaN(height)) {
            const bodySurface = this.calculateBodySurface(age, weight, height);
            result = result * bodySurface / 1.73;
            return new GfrResult(Math.round(result * 100) / 100, "mL/min", "Mayo");
        }
        
        return new GfrResult(Math.round(result * 100) / 100, "mL/min/1.73m²", "Mayo");
    }

    public calculateCkdEpi(serumCreatinine: number, unit: CreatinineUnit, age: number, gender: GenderTypes, weight: number, height: number) {
        serumCreatinine = this.convertSerumCreatinineUnit(serumCreatinine, unit);
        const genderFactors = GenderFactors[gender];
        const scOverK = serumCreatinine / genderFactors.ckdEpiK;
        const minTerm = Math.min(scOverK, 1);
        const maxTerm = Math.max(scOverK, 1);

        let result =
            142 * minTerm ** genderFactors.ckdEpiA * maxTerm ** -1.2 * 0.9938 ** age * genderFactors.ckdEpi;

        if (!isNaN(weight) && !isNaN(height)) {
            const bodySurface = this.calculateBodySurface(age, weight, height);
            result = result * bodySurface / 1.73;
            return new GfrResult(Math.round(result * 100) / 100, "mL/min", "CKD-EPI");
        }
        return new GfrResult(Math.round(result * 100) / 100, "mL/min/1.73m²", "CKD-EPI");
    }

    public calculateCkdEpiForCystatin(serumCystatin: number, age: number, gender: GenderTypes) {
        const genderFactors = GenderFactors[gender];
        const cysOverK = serumCystatin / 0.8;
        const minTerm = Math.min(cysOverK, 1);
        const maxTerm = Math.max(cysOverK, 1);

        let result = 133 * minTerm ** -0.499 * maxTerm ** -1.328 * 0.996 ** age * genderFactors.ckdEpiCys;

        return new GfrResult(Math.round(result * 100) / 100, "ml/min/1.73m²", "CKD-EPI-Cystatin");
    }

    public calculateCkdEpiForCreatinineAndCystatin(
        serumCreatinine: number,
        scUnit: CreatinineUnit,
        serumCystatin: number,
        gender: GenderTypes,
        age: number
    ) {
        serumCreatinine = this.convertSerumCreatinineUnit(serumCreatinine, scUnit);
        const genderFactors = GenderFactors[gender];
        const alpha = genderFactors.ckdEpiCreatinineCystatinAlpha;
        const scOverK = serumCreatinine / genderFactors.ckdEpiCreatinineCystatinK;
        const cysOver = serumCystatin / 0.8;
        const minTermCreatinine = Math.min(scOverK, 1);
        const maxTermCreatinine = Math.max(scOverK, 1);
        const minTermCystatin = Math.min(cysOver, 1);
        const maxTermCystatin = Math.max(cysOver, 1);

        const result = 142 * minTermCreatinine ** alpha * maxTermCreatinine ** -1.200 * minTermCystatin ** -0.500 *
            maxTermCystatin ** -1.800 * 0.9938 ** age * genderFactors.ckdEpiCreatinineCystatin;

        return new GfrResult(Math.round(result * 100) / 100, "ml/min/1.73m²", "CKD-EPI-Cystatin-Kreatinin");
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

    private calculateBodySurface(age: number, weight: number, height: number): number {
        if (age >= 18) {
            // DuBois-Formel
            return (
                Math.pow(weight, 0.425) *
                Math.pow(height, 0.725) *
                0.007184
            );
        } else {
            // Mosteller-Formel
            const inner = weight * height / 3600;
            return Math.pow(inner, 0.5);
        }
    }

}
