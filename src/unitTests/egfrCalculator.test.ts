import {beforeEach, describe, expect, it} from "vitest";
import {EgfrCalculator} from "../services/egfrCalculator.ts";

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
            const gender = "weiblich";
            const skinColor = "weiß";

            const result = calculator.calculateMdrd(
                serumCreatinine,
                unit,
                age,
                gender,
                skinColor,
                NaN,
                NaN
            ).value;

            const expected = 62.38;

            console.log("expected ", expected);
            console.log("result ", result);
            expect(result).toBe(expected);
        });

        it("should handle correct unit conversion from µmol/l to mg/dl", () => {
            const serumCreatinine = 100;
            const unit = "µmol/l";
            const age = 50;
            const gender = "männlich";
            const skinColor = "schwarz";

            const result = calculator.calculateMdrd(
                serumCreatinine,
                unit,
                age,
                gender,
                skinColor,
                NaN,
                NaN
            ).value;

            const expected = 88.4;

            console.log("expected ", expected);
            console.log("result ", result);
            expect(result).toBe(expected);
        });
    });

    describe("calculate MayoQuadratic", () => {
        it("should calculate correct value for 40 years old male with 1.2mg/dl", () => {
            const serumCreatinine = 1.2;
            const unit = "mg/dl";
            const age = 40;
            const gender = "männlich";

            const result = calculator.calculateMayoQuadratic(
                serumCreatinine,
                unit,
                age,
                gender,
                NaN,
                NaN
            ).value;

            const expected = 93.95;

            console.log("expected ", expected);
            console.log("result ", result);
            expect(result).toBe(expected);
        });
    });

    describe("calculate CKD-EPI", () => {
        it("should calculate correct value for 65 years old female with 0.9mg/dl", () => {
            const serumCreatinine = 0.9;
            const age = 65;
            const gender = "weiblich";

            const result = calculator.calculateCkdEpi(
                serumCreatinine,
                "mg/dl",
                age,
                gender,
                NaN,
                NaN
            ).value;

            const expected = 70.95;

            console.log("expected ", expected);
            console.log("result ", result);
            expect(result).toBe(expected);
        });
    });

    describe("calculate CKD-EPI For Cystatin C", () => {
        it("should calculate correct value for 40 years old male with 1.1mg/l", () => {
            const cystatin = 1.1;
            const age = 40;
            const gender = "männlich";

            const result = calculator.calculateCkdEpiForCystatin(
                cystatin,
                age,
                gender
            ).value;

            const expected = 74.23;

            console.log("expected ", expected);
            console.log("result ", result);
            expect(result).toBe(expected);
        });
    });

    describe("calculate CKD-EPI For Creatinine and Cystatin C", () => {
        it("should calculate correct value for 50 years old male with 2mg/dl of creatinine and 2mg/l of cystatin C", () => {
            const serumCreatinine = 2.0;
            const serumCystatin = 2.0;
            const age = 50;
            const gender = "männlich";
            const scUnit = "mg/dl";

            const result = calculator.calculateCkdEpiForCreatinineAndCystatin(
                serumCreatinine,
                scUnit,
                serumCystatin,
                gender,
                age
            ).value;

            const expected = 35.26;

            console.log("expected ", expected);
            console.log("result ", result);
            expect(result).toBe(expected);
        });

        // Reference values from the customer's eGFR.xlsx worked example
        // (SCr=6 mg/dl, Cys-C=3 mg/l, age 57), "2021 combined" cells K14/J14.
        it("should match the spreadsheet reference for a 57 years old male", () => {
            const result = calculator.calculateCkdEpiForCreatinineAndCystatin(
                6.0,
                "mg/dl",
                3.0,
                "männlich",
                57
            ).value;

            expect(result).toBe(13.77);
        });

        it("should match the spreadsheet reference for a 57 years old female", () => {
            const result = calculator.calculateCkdEpiForCreatinineAndCystatin(
                6.0,
                "mg/dl",
                3.0,
                "weiblich",
                57
            ).value;

            expect(result).toBe(12.01);
        });
    });

    describe("calculate Cockcroft & Gault", () => {
        it("should calculate correct value for 60 years old female with 1mg/dl", () => {
            const serumCreatinine = 1.0;
            const age = 60;
            const gender = "weiblich";
            const weight = 65;
            const unit = "mg/dl";

            const result = calculator.calculateCockcroftGault(
                serumCreatinine,
                unit,
                age,
                gender,
                weight
            ).value;

            const expected = 61.39;

            console.log("expected ", expected);
            console.log("result ", result);
            expect(result).toBe(expected);
        });
    });
});
