export type CalcTypes = "MDRD" | "CKD-EPI" | "Mayo" | "Cockcroft-Gault";
export type GenderTypes = "m" | "w";
export type CreatinineUnit = "mg/dl" | "µmol/l";
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
