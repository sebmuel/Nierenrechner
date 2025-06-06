import type { CalcTypes, CalculatorInputFields } from "../types";

export class GfrResult {
  constructor(public value: number, public unit: string, public calculatorType: CalcTypes) {}

  toString(): string {
    return `${this.value} ${this.unit}`;
  }
}

export class CalcResult extends GfrResult {
  constructor(
    public value: number,
    public unit: string,
    public calculatorType: CalcTypes,
    public formData: Record<string, CalculatorInputFields>
  ) {
    super(value, unit, calculatorType);
  }
}
