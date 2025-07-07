import type {IconName} from "@fortawesome/fontawesome-svg-core";
import type {CalcResult} from "./classes/GfrResult";

export const creatinineUnits = ["mg/dl", "µmol/l"] as const;
export type CreatinineUnit = (typeof creatinineUnits)[number];

export const genderTypes = ["männlich", "weiblich"] as const;
export type GenderTypes = (typeof genderTypes)[number];
export type CalcTypes =
    "MDRD"
    | "CKD-EPI"
    | "Mayo"
    | "CKD-EPI-Cystatin"
    | "CKD-EPI-Cystatin-Kreatinin"
    | "Cockcroft-Gault";
export const skinColor = ["schwarz", "weiß"] as const;
export type SkinColor = (typeof skinColor)[number];
export type Creatine = string;

export type Classification = {
    name: string;
    description: string;
    min: number;
    max: number;
    text: string;
    grade: string;
    symptoms?: string;
    measure?: string;
    mark?: string;
};

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

export class ResultEvent extends CustomEvent<CalcResult> {
    constructor(type: string, eventInitDict: CustomEventInit<CalcResult>) {
        eventInitDict.bubbles = true;
        eventInitDict.composed = true;
        super(type, eventInitDict);
    }
}

export type CalculatorInputTypes = "text" | "number";
export type CalculatorInputValues =
    | string
    | number
    | GenderTypes
    | SkinColor
    | CreatinineUnit;

export type CalculatorInputFields = {
    icon: IconName | undefined;
    name: string;
    value: CalculatorInputValues;
};
