import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {EgfrCalculator} from "../../services/egfrCalculator";
import {
    type CalculatorInputFields,
    type CreatinineUnit,
    creatinineUnits,
    genderTypes,
    type GenderTypes,
    ResultEvent
} from "../../types";
import {appStyles} from "../../styles/app-styles";
import "../description";
import {CalcResult} from "../../classes/GfrResult";
import classificationService from "../../services/classification-service";

@customElement("app-mayo-calculator")
export default class MayoCalculator extends LitElement {
    static styles = [
        appStyles,
        css`
      .calc-inputs {
        display: grid;
        grid-template-columns:
          [serumCreatinine] minmax(max-content, 25%)
          [unit] max-content
          [age] max-content
          [gender]max-content;

        gap: 10px;
        margin-bottom: 30px;
      }

      @media (max-width: 980px) {
        .calc-inputs {
          grid-template-columns: 1fr;
        }
      }
    `,
    ];

    calculator: EgfrCalculator = new EgfrCalculator();

    submit(e: SubmitEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const serumCreatinine = Number.parseFloat(
            formData.get("serumCreatinine") as string
        );
        const age = Number.parseInt(formData.get("age") as string);
        const unit = formData.get("unit") as CreatinineUnit;
        const gender = formData.get("gender") as GenderTypes;

        const result = this.calculator.calculateMayoQuadratic(
            serumCreatinine,
            unit,
            age,
            gender
        );

        const calcResult = new CalcResult(
            result.value,
            result.unit,
            result.calculatorType,
            this.mapInputTypes(formData),
            classificationService.getClassificationByScore(result.value)!
        );

        this.dispatchEvent(new ResultEvent("result", { detail: calcResult }));
    }

    mapInputTypes(data: FormData): Record<string, CalculatorInputFields> {
        return {
            serumCreatinine: {
                name: "serumCreatinine",
                value: data.get("serumCreatinine") as string,
                icon: "syringe",
            },
            age: {
                name: "age",
                value: data.get("age") as string,
                icon: "birthday-cake",
            },
            gender: {
                name: "gender",
                value: data.get("gender") as GenderTypes,
                icon: "mars-and-venus",
            },
            unit: {
                name: "unit",
                value: data.get("unit") as CreatinineUnit,
                icon: undefined,
            }
        };
    }

    render() {
        return html`
      <div class="calc-wrapper">
        <calc-description>
          <h3 slot="headline">Berechnung der eGFR mit der Mayo-Formel</h3>
          <p slot="description">
            Die Mayo-Klinik-Formel kann angewendet werden, wenn die Diagnose noch nicht bekannt ist. 
            Bei der Entwicklung der Formel wurden sowohl Personen mit normaler Nierenfunktion als auch Personen mit Niereninsuffizienz berücksichtigt.
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
                mark
                ${creatinineUnits.map(
            (unit) => html` <option value=${unit}>${unit}</option> `
        )}
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
                ${genderTypes.map(
            (gender) => html` <option value=${gender}>${gender}</option> `
        )}
              </select>
            </div>
          </div>
          <button type="submit">Berechnen</button>
        </form>
      </div>
    `;
    }
}
