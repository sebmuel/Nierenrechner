import type {CreatinineUnit, GenderTypes, SkinColor} from "../types.ts";
import {logger} from "./debugger-logger.ts";
import {GenderFactors} from "../constants/genderFactors.ts";
import {SkinColorFactors} from "../constants/skinColorFactors.ts";

export class EgfrCalculator {

    public calculateMdrd(serumCreatinine: number, unit: CreatinineUnit, age: number, gender: GenderTypes, skinColor: SkinColor) {

        serumCreatinine = this.validateSerumCreatinineUnit(serumCreatinine, unit);
        const genderFactors = GenderFactors[gender];
        const skinColorFactors = SkinColorFactors[skinColor];
        
        const result = 186 *
            Math.pow(serumCreatinine, -1.154) *
            Math.pow(age, -0.203) *
            genderFactors.mdrd *
            skinColorFactors.mdrd;
        
        return Math.round(result * 100) / 100;
    }

    public calculateMayoQuadratic(serumCreatinine: number, unit: CreatinineUnit, age: number, gender: GenderTypes) {
        
        serumCreatinine = this.validateSerumCreatinineUnit(serumCreatinine, unit);
        const genderFactors = GenderFactors[gender];
        
        const exponent = 1.911 +
            5.249 / serumCreatinine -
            2.114 / (serumCreatinine ** 2) -
            0.00686 * age -
            genderFactors.mayoQuadratic;

        let result = Math.exp(exponent);
        logger.log('result ' + result);
        return Math.round(result * 100) / 100;
    }

    public calculateCkdEpi(serumCreatinine: number, unit: CreatinineUnit, age: number, gender: GenderTypes) {

        serumCreatinine = this.validateSerumCreatinineUnit(serumCreatinine, unit);
        const genderFactors = GenderFactors[gender];
        const scOverK = serumCreatinine / genderFactors.ckdEpiK;
        const minTerm = Math.min(scOverK, 1);
        const maxTerm = Math.max(scOverK, 1);

        const result = 142 *
            (minTerm ** genderFactors.ckdEpiA) *
            (maxTerm ** -1.200) *
            (0.9938 ** age) *
            genderFactors.ckdEpi;

        return Math.round(result * 100) / 100;
    }
    
    public calculateCkdEpiForCystatin(cystatin: number, age: number, gender: GenderTypes) {

        const genderFactors = GenderFactors[gender];
        const cysOverK = cystatin / 0.8;
        const minTerm = Math.min(cysOverK, 1);
        const maxTerm = Math.max(cysOverK, 1);
        
        let result = 133 *
            (minTerm ** -0.499) *
            (maxTerm ** -1.328) *
            (0.996 ** age) *
            genderFactors.ckdEpiCys;
        
        return Math.round(result * 100) / 100;
    }
    
    public calculateCockcroftGault(serumCreatinine: number, unit: CreatinineUnit, age: number, gender: GenderTypes, weight: number) {
        
        serumCreatinine = this.validateSerumCreatinineUnit(serumCreatinine, unit);
        const genderFactors = GenderFactors[gender];
        const ageResult = 140 - age;
        const weightResult = weight / 72;
        
        const result = ageResult / serumCreatinine *
            weightResult *
            genderFactors.cockcroftGault;
        
        return Math.round(result * 100) / 100
    }

    private validateSerumCreatinineUnit(serumCreatinine: number, unit: CreatinineUnit) {
        if (unit === "µmol/l") {
            serumCreatinine = serumCreatinine / 88.42;
            logger.log(`Converted SerumCreatinine to ${serumCreatinine} mg/dl`);
        }
        return serumCreatinine;
    }
}