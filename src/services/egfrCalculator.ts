import type {KreatininEinheit} from "../types.ts";
import {logger} from "./debugger-logger.ts";

export class EgfrCalculator {

    public calculateMayoQuadratic(serumKreatinin: number, einheit: KreatininEinheit, alter: number, geschlecht: "m" | "w") {
        if (einheit === "µmol/l") {
            serumKreatinin = this.convertSerumCreatinineToMgDl(serumKreatinin);
            logger.log(`Converted SerumKreatinin to ${serumKreatinin} mg/dl`);
        }

        const exponent = 1.911 +
            5.249 / serumKreatinin -
            2.114 / (serumKreatinin ** 2) -
            0.00686 * alter -
            (geschlecht === "w" ? 0.205 : 0);

        let result = Math.exp(exponent);
        logger.log('result ' + result);
        return (Math.round(result * 100) / 100) + " ml/min/1.73m²";
    }

    public calculateCkdEpi(serumKreatinin: number, einheit: KreatininEinheit, alter: number, geschlecht: "m" | "w") {
        const k = geschlecht === "w" ? 0.7 : 0.9;
        const a = geschlecht === "w" ? -0.329 : -0.411;

        if (einheit === "µmol/l") {
            serumKreatinin = this.convertSerumCreatinineToMgDl(serumKreatinin);
            logger.log(`Converted SerumKreatinin to ${serumKreatinin} mg/dl`);
        }
        
        const skOverK = serumKreatinin / k;
        const minTerm = Math.min(skOverK, 1);
        const maxTerm = Math.max(skOverK, 1);

        const result = 142 *
            (minTerm ** a) *
            (maxTerm ** -1.200) *
            (0.9938 ** alter) *
            (geschlecht === "w" ? 1.012 : 1);
        
        return (Math.round(result * 100) / 100);
    }

    private convertSerumCreatinineToMgDl(serumKreatinin: number) {
        return serumKreatinin / 88.42;
    }
}