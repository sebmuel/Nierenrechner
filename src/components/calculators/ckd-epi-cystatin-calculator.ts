import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {EgfrCalculator} from "../../services/egfrCalculator";
import {type CalculatorInputFields, genderTypes, type GenderTypes, ResultEvent,} from "../../types";
import {appStyles} from "../../styles/app-styles";
import "../description";
import {CalcResult} from "../../classes/GfrResult";
import classificationService from "../../services/classification-service";

@customElement("app-ckd-epi-cystatin-calculator")
export default class ckdEpiCystatinCalculator extends LitElement {
  static styles = [
    appStyles,
    css`
      .calc-inputs {
        display: grid;
        grid-template-columns:
          [serumCystatin] minmax(max-content, 25%)
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
    const serumCystatin = Number.parseFloat(
      formData.get("serumCystatin") as string
    );
    const age = Number.parseInt(formData.get("age") as string);
    const gender = formData.get("gender") as GenderTypes;

    const result = this.calculator.calculateCkdEpiForCystatin(
      serumCystatin,
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
      serumCystatin: {
        name: "serumCystatin",
        value: data.get("serumCystatin") as string,
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
      }
    };
  }

  render() {
    return html`
      <div class="calc-wrapper">
        <calc-description>
          <h3 slot="headline">Berechnung der eGFR mit der CKD-EPI-für-Cystatin-C-Formel</h3>
          <p slot="description">
            Die eGFR (geschätzte glomeruläre Filtrationsrate) kann auch unter Verwendung von Cystatin C anstelle von Kreatinin berechnet werden, 
            was eine alternative Methode zur Beurteilung der Nierenfunktion bietet.
          </p>
        </calc-description>
        <form @submit=${this.submit}>
          <div class="calc-inputs">
            <div class="input-wrapper">
              <label for="serumCystatin">Cystatin im Serum (SCys)</label>
              <input
                type="number"
                placeholder="00.00"
                min="0"
                required
                step="0.01"
                name="serumCystatin"
                id="serumCystatin"
              />
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
