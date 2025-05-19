export type CalcTypes = "MDRD" | "CKD-EPI" | "Mayo" | "Cockcroft-Gault";
export type GenderTypes = "male" | "female";
export type KreatininEinheit = "mg/dl" | "µmol/l";

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
