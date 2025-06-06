import type { GfrResult } from "./classes/GfrResult";

export const creatinineUnits = ["mg/dl", "µmol/l"] as const;
export type CreatinineUnit = (typeof creatinineUnits)[number];
export const genderTypes = ["maennlich", "weiblich"] as const;
export type GenderTypes = (typeof genderTypes)[number];

export type CalcTypes = "MDRD" | "CKD-EPI" | "Mayo" | "Cockcroft-Gault";
export type SkinColor = "black" | "white";

/**
 * Event fired when a tab is selected
 */
export type TabSelectedData = {
  tabIndex: number;
};

export class TabSelectedEvent extends CustomEvent<TabSelectedData> {
  constructor(type: string, eventInitDict: CustomEventInit<TabSelectedData>) {
    eventInitDict.bubbles = true;
    eventInitDict.composed = true;
    super(type, eventInitDict);
  }
}

export class ResultEvent extends CustomEvent<GfrResult> {
  constructor(type: string, eventInitDict: CustomEventInit<GfrResult>) {
    eventInitDict.bubbles = true;
    eventInitDict.composed = true;
    super(type, eventInitDict);
  }
}

export type CalculatorInputTypes = "text" | "number";
