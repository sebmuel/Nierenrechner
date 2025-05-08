import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("mdrd-egfr-calculator")
export class MDRDEGFRCalculator extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 400px;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 1rem;
      font-family: sans-serif;
    }

    label {
      display: block;
      margin-top: 0.75rem;
    }

    input,
    select {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }

    .result {
      margin-top: 1rem;
      font-weight: bold;
    }

    .note {
      font-size: 0.85rem;
      color: #666;
      margin-top: 1rem;
    }

    .error {
      color: darkred;
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
    }
  `;

  @state() private kreatinin: number | null = 1.0;
  @state() private alter: number | null = 40;
  @state() private geschlecht: "m" | "w" = "m";
  @state() private schwarz: boolean = false;
  @state() private gfr: number | null = null;
  @state() private errors: { kreatinin?: string; alter?: string } = {};

  private validate() {
    const errors: typeof this.errors = {};

    if (
      this.kreatinin === null ||
      isNaN(this.kreatinin) ||
      this.kreatinin <= 0
    ) {
      errors.kreatinin = "Bitte gültigen Wert > 0 für Kreatinin eingeben.";
    }

    if (this.alter === null || isNaN(this.alter) || this.alter <= 0) {
      errors.alter = "Bitte gültiges Alter > 0 eingeben.";
    }

    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  private calculate() {
    if (!this.validate()) {
      this.gfr = null;
      return;
    }

    const skr = this.kreatinin!;
    const age = this.alter!;
    let result =
      186 *
      Math.pow(skr, -1.154) *
      Math.pow(age, -0.203) *
      (this.geschlecht === "w" ? 0.742 : 1) *
      (this.schwarz ? 1.212 : 1);

    this.gfr = Math.round(result);
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const name = target.name;
    const value = target.value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      this.schwarz = target.checked;
    } else if (name === "kreatinin") {
      this.kreatinin = parseFloat(value);
    } else if (name === "alter") {
      this.alter = parseInt(value);
    } else if (name === "geschlecht") {
      this.geschlecht = value as "m" | "w";
    }

    // Re-validate live
    this.validate();
  }

  render() {
    return html`
      <h3>MDRD eGFR Rechner</h3>

      <label>
        Serumkreatinin (mg/dL):
        <input
          type="number"
          name="kreatinin"
          step="0.01"
          .value=${String(this.kreatinin ?? "")}
          @input=${this.handleInput}
        />
        ${this.errors.kreatinin
          ? html`<div class="error">${this.errors.kreatinin}</div>`
          : null}
      </label>

      <label>
        Alter (Jahre):
        <input
          type="number"
          name="alter"
          .value=${String(this.alter ?? "")}
          @input=${this.handleInput}
        />
        ${this.errors.alter
          ? html`<div class="error">${this.errors.alter}</div>`
          : null}
      </label>

      <label>
        Geschlecht:
        <select
          name="geschlecht"
          .value=${this.geschlecht}
          @change=${this.handleInput}
        >
          <option value="m">Männlich</option>
          <option value="w">Weiblich</option>
        </select>
      </label>

      <label>
        Schwarze Hautfarbe:
        <input
          type="checkbox"
          name="schwarz"
          .checked=${this.schwarz}
          @change=${this.handleInput}
        />
      </label>

      <button @click=${this.calculate} ?disabled=${!this.validate()}>
        Berechnen
      </button>

      ${this.gfr !== null
        ? html`<div class="result">
            Ergebnis: ${this.gfr > 60 ? "> 60" : this.gfr} ml/min/1,73m²
          </div>`
        : null}

      <div class="note">
        Hinweis: Es wird der Faktor <strong>186</strong> verwendet (keine
        IDMS-Messung).<br />
        Nicht geeignet für Kinder und Jugendliche.
      </div>
    `;
  }
}
