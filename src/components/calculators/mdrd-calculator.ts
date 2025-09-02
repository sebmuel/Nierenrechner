import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {EgfrCalculator} from "../../services/egfrCalculator";
import {
    type CalculatorInputFields,
    type CreatinineUnit,
    creatinineUnits,
    genderTypes,
    type GenderTypes,
    ResultEvent,
    skinColor,
    type SkinColor,
} from "../../types";
import {appStyles} from "../../styles/app-styles";
import "../description";
import {CalcResult} from "../../classes/GfrResult";
import classificationService from "../../services/classification-service";

@customElement("app-mdrd-calculator")
export default class MdrdCalculator extends LitElement {
    static styles = [
        appStyles,
        css`
            .calc-inputs {
                display: grid;
                grid-template-columns:
          [serumCreatinine] minmax(max-content, 25%)
          [unit] min(15%)
          [age] max-content
          [gender]max-content
          [skinColor] max-content;

                gap: 10px;
                margin-bottom: 30px;
            }

            #bodySurface input {
                height: 36px;
                width: 15px
            }

            #bodySurface label {
                display: inline-block;
                width: 210px;
                padding-top: 20px;
                color: var(--app-paragraph-font-color);
            }

            #height, #weight {
                background-color: var(--app-gray)
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
        const scUnit = formData.get("scUnit") as CreatinineUnit;
        const gender = formData.get("gender") as GenderTypes;
        const skinColor = formData.get("skinColor") as SkinColor;
        const weight = Number.parseFloat(formData.get("weight") as string);
        const height = Number.parseFloat(formData.get("height") as string);

        const result = this.calculator.calculateMdrd(
            serumCreatinine,
            scUnit,
            age,
            gender,
            skinColor,
            weight,
            height
        );

        const calcResult = new CalcResult(
            result.value,
            result.unit,
            result.calculatorType,
            this.mapInputTypes(formData),
            classificationService.getClassificationByScore(result.value)!
        );

        this.dispatchEvent(new ResultEvent("result", {detail: calcResult}));
    }

    mapInputTypes(data: FormData): Record<string, CalculatorInputFields> {
        const inputs: Record<string, CalculatorInputFields> = {
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
            scUnit: {
                name: "scUnit",
                value: data.get("scUnit") as CreatinineUnit,
                icon: undefined,
            },
            skinColor: {
                name: "skinColor",
                value: data.get("skinColor") as SkinColor,
                icon: "user",
            },
        };

        //Check if weight and height are given in form
        const weightStr = data.get("weight") as string | null;
        const heightStr = data.get("height") as string | null;

        if (weightStr) {
            inputs.weight = {
                name: "weight",
                value: weightStr,
                icon: "weight-scale",
            };
        }

        if (heightStr) {
            inputs.height = {
                name: "height",
                value: heightStr,
                icon: "ruler-vertical",
            };
        }

        return inputs;
    }

    render() {
        return html`
            <div class="calc-wrapper">
                <calc-description>
                    <h3 slot="headline">Berechnung der eGFR mit der MDRD-Formel</h3>
                    <p slot="description">
                        Für die vereinfachte Formel 4 der MDRD-Formelserie werden lediglich Kreatinin, Alter, Geschlecht
                        und Hautfarbe benötigt.
                        Seit Einführung der CKD-EPI-Formel werden die Formeln 1 bis 3 nur noch selten angewendet.
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
                            <label for="scUnit">Einheit</label>
                            <select id="scUnit" name="scUnit">
                                mark
                                ${creatinineUnits.map(
                                        (unit) => html`
                                            <option value=${unit}>${unit}</option> `
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
                                        (gender) => html`
                                            <option value=${gender}>${gender}</option> `
                                )}
                            </select>
                        </div>

                        <div class="input-wrapper">
                            <label for="skinColor">Hautfarbe</label>
                            <select id="skinColor" name="skinColor">
                                ${skinColor.map(
                                        (color) => html`
                                            <option value=${color}>${color}</option> `
                                )}
                            </select>
                        </div>

                        <div class="input-wrapper">
                            <label for="weight">Gewicht (kg)</label>
                            <input
                                    disabled
                                    type="number"
                                    min="1"
                                    step="1"
                                    name="weight"
                                    id="weight"
                            />
                        </div>

                        <div class="input-wrapper">
                            <label for="height">Größe (cm)</label>
                            <input
                                    disabled
                                    type="number"
                                    min="1"
                                    step="1"
                                    name="height"
                                    id="height"
                            />
                        </div>

                        <div id="bodySurface">
                            <input type="checkbox" id="standardization" @change=${this.toggleStandardization}/>
                            <label for="standardization">
                                Berechnung auf normierte Körperfläche 1.73m<sup>2</sup>
                            </label>
                        </div>
                    </div>
                    <button type="submit">Berechnen</button>
                </form>
            </div>
        `;
    }

    toggleStandardization(e: Event) {
        const checked = (e.target as HTMLInputElement).checked;

        const weight = this.renderRoot.querySelector<HTMLInputElement>("#weight");
        const height = this.renderRoot.querySelector<HTMLInputElement>("#height");

        if (weight && height) {
            if (!checked) {
                weight.setAttribute("disabled", "true");
                height.setAttribute("disabled", "true");
                weight.style.backgroundColor = "var(--app-gray)"
                height.style.backgroundColor = "var(--app-gray)"
            } else {
                weight.removeAttribute("disabled");
                height.removeAttribute("disabled");
                weight.style.backgroundColor = "white"
                height.style.backgroundColor = "white"
            }
        }
    }
}
