import { beforeEach, describe, expect, it } from "vitest";
import { EgfrCalculator } from "../services/egfrCalculator.ts";

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
      const skinColor = "white";

      const result = calculator.calculateMdrd(
        serumCreatinine,
        unit,
        age,
        gender,
        skinColor
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
      const skinColor = "black";

      const result = calculator.calculateMdrd(
        serumCreatinine,
        unit,
        age,
        gender,
        skinColor
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
        gender
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
        gender
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
