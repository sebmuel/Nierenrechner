import { describe, it, expect, vi, beforeEach } from "vitest";
import {EgfrCalculator} from "../services/egfrCalculator.ts";
import {GenderFactors} from "../constants/genderFactors.ts";
import{SkinColorFactors} from "../constants/skinColorFactors.ts";

// Mokup Logger
vi.mock("./debugger-logger", () => ({
    logger: { log: vi.fn() }
}));

// Creating a test suite to group tests
describe("EgfrCalculator", () => {
    let calculator: EgfrCalculator;

    beforeEach(() => {
        calculator = new EgfrCalculator();
    });

    describe("calculate MDRD", () => {
        it("should calculate correct value for white 50 years old female with 1mg/dl", () => {
            const serumCreatinine = 1.0;
            const unit = "mg/dl";
            const age = 50;
            const gender = "w";
            const skinColor = "white";
            
            const result = calculator.calculateMdrd(serumCreatinine, unit, age, gender, skinColor);
            
            const expected = 186 *
                Math.pow(serumCreatinine, -1.154) *
                Math.pow(age, -0.203) *
                GenderFactors[gender].mdrd *
                SkinColorFactors[skinColor].mdrd;
            
            expect(result).toBe(Math.round(expected * 100) / 100);
        });

        it("should handle unit conversion", () => {
            const serumCreatinine = 88.42;
            const unit = "µmol/l";
            const age = 50;
            const gender = "m";
            const skinColor = "black";
            
            const result = calculator.calculateMdrd(serumCreatinine, unit, age, gender, skinColor);

            const serumCreatinineMgDl = serumCreatinine / 88.42;
            const expected = 186 *
                Math.pow(serumCreatinineMgDl, -1.154) *
                Math.pow(age, -0.203) *
                GenderFactors[gender].mdrd *
                SkinColorFactors[skinColor].mdrd;
            expect(result).toBe(Math.round(expected * 100) / 100);
        });
    });

    describe("calculate MayoQuadratic", () => {
        it("should calculate correct value for 40 years old male with 1.2mg/dl", () => {
            const serumCreatinine = 1.2;
            const unit = "mg/dl";
            const age = 40;
            const gender = "m";

            const result = calculator.calculateMayoQuadratic(serumCreatinine, unit, age, gender);
            
            const exponent =
                1.911 +
                5.249 / serumCreatinine -
                2.114 / (serumCreatinine ** 2) -
                0.00686 * age -
                GenderFactors[gender].mayoQuadratic;
            const expected = Math.exp(exponent);
            expect(result).toBe(Math.round(expected * 100) / 100);
        });
    });

    describe("calculate CKD-EPI", () => {
        it("should calculate correct value for 65 years old female with 0.9mg/dl", () => {
            const serumCreatinine = 0.9;
            const age = 65;
            const gender = "w";
            const genderFact = GenderFactors[gender];
            const scOverK = serumCreatinine / genderFact.ckdEpiK;
            const minTerm = Math.min(scOverK, 1);
            const maxTerm = Math.max(scOverK, 1);

            const result = calculator.calculateCkdEpi(serumCreatinine, "mg/dl", age, gender);
            
            const expected = 142 *
                (minTerm ** genderFact.ckdEpiA) *
                (maxTerm ** -1.200) *
                (0.9938 ** age) *
                genderFact.ckdEpi;
            expect(result).toBe(Math.round(expected * 100) / 100);
        });
    });

    describe("calculate CKD-EPI For Cystatin C", () => {
        it("should calculate correct value for 40 years old male with 1.1mg/l", () => {
            const cystatin = 1.1;
            const age = 40;
            const gender = "m";
            const cysOverK = cystatin / 0.8;
            const minTerm = Math.min(cysOverK, 1);
            const maxTerm = Math.max(cysOverK, 1);

            const result = calculator.calculateCkdEpiForCystatin(cystatin, age, gender);
            
            const expected = 133 *
                (minTerm ** -0.499) *
                (maxTerm ** -1.328) *
                (0.996 ** age) *
                GenderFactors[gender].ckdEpiCys;
            
            expect(result).toBe(Math.round(expected * 100) / 100);
        });
    });

    describe("calculate Cockcroft & Gault", () => {
        it("should calculate correct value for 60 years old female with 1mg/dl", () => {
            const serumCreatinine = 1.0;
            const age = 60;
            const gender = "w";
            const weight = 65;
            const unit = "mg/dl";
            const ageResult = 140 - age;
            const weightResult = weight / 72;

            const result = calculator.calculateCockcroftGault(serumCreatinine, unit, age, gender, weight);
            
            const expected = ageResult / serumCreatinine * weightResult * GenderFactors[gender].cockcroftGault;
            expect(result).toBe(Math.round(expected * 100) / 100);
        });
    });
});