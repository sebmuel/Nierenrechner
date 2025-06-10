import type { Classification } from "./../types";
import type { CalcTypes, CalculatorInputFields } from "../types";

export class GfrResult {
  constructor(
    public value: number,
    public unit: string,
    public calculatorType: CalcTypes
  ) {}

  toString(): string {
    return `${this.value} ${this.unit}`;
  }
}

export class CalcResult extends GfrResult {
  constructor(
    public value: number,
    public unit: string,
    public calculatorType: CalcTypes,
    public formData: Record<string, CalculatorInputFields>,
    public classification: Classification
  ) {
    super(value, unit, calculatorType);
  }
}
