import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { EgfrCalculator } from "../../services/egfrCalculator";
import {
  creatinineUnits,
  genderTypes,
  ResultEvent,
  type CreatinineUnit,
  type GenderTypes,
} from "../../types";
import { appStyles } from "../../styles/app-styles";
import "../description";
import { logger } from "../../services/debugger-logger";

@customElement("app-cmkd-epi-calculator")
export default class CmkdEpiCalculator extends LitElement {
  static styles = [
    appStyles,
    css`
      .calc-inputs {
        display: grid;
        grid-template-columns:
          [serumCreatinine] minmax(min-content, 25%)
          [unit] minmax(min-content, 10%)
          [age] minmax(min-content, 10%)
          [gender] minmax(min-content, 10%);

        gap: 30px;
        margin-bottom: 30px;
      }
    `,
  ];

  calculator: EgfrCalculator = new EgfrCalculator();

  submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const serumCreatinine = Number.parseInt(formData.get("serumCreatinine") as string);
    const unit = formData.get("unit") as CreatinineUnit;
    const age = formData.get("age") as string;
    const gender = formData.get("gender") as GenderTypes;
    const result = this.calculator.calculateCkdEpi(serumCreatinine, unit, Number(age), gender);
    this.dispatchEvent(new ResultEvent("result", { detail: result }));
  }

  render() {
    return html`
      <div class="calc-wrapper">
        <calc-description>
          <h3 slot="headline">Berechnung der eGFR mit der CKD-EPI-Formel</h3>
          <p slot="description">
            Die CKD-EPI-Formel (2021) schätzt die GFR genauer als die MDRD-Formel und ist insbesondere im
            Grenzbereich von gesunder Funktion und beginnender Niereninsuffizienz noch zuverlässiger.
          </p>
        </calc-description>
        <form @submit=${this.submit}>
          <div class="calc-inputs">
            <div class="input-wrapper">
              <label for="serumCreatinine">Kreatinin im Serum (SKr)</label>
              <input
                type="number"
                placeholder="00.00"
                min="0"
                required
                step="0.01"
                name="serumCreatinine"
                id="serumCreatinine"
              />
            </div>
            <div class="input-wrapper">
              <label for="unit">Einheit</label>
              <select id="unit" name="unit">
                ${creatinineUnits.map((unit) => html` <option value=${unit}>${unit}</option> `)}
              </select>
            </div>

            <div class="input-wrapper">
              <label for="age">Alter (Jahre)</label>
              <input
                type="number"
                placeholder="18-99"
                min="18"
                max="99"
                required
                step="1"
                name="age"
                id="age"
              />
            </div>

            <div class="input-wrapper">
              <label for="gender">Geschlecht</label>
              <select id="gender" name="gender">
                ${genderTypes.map((gender) => html` <option value=${gender}>${gender}</option> `)}
              </select>
            </div>
          </div>
          <button type="submit">Berechnen</button>
        </form>
      </div>
    `;
  }
}
