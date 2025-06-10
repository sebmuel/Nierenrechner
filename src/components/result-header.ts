import { appStyles } from "./../styles/app-styles";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { CalculatorInputFields, Classification } from "../types";
import FieldMapper from "../services/field-mapper";
import { iconService } from "../services/icon-service";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("result-header")
export class ResultHeader extends LitElement {
  @property({ type: Object })
  fields: Record<string, CalculatorInputFields> = {};
  #fieldMapper = new FieldMapper();
  @property({ type: Object }) classification: Classification | undefined;

  static styles = [
    appStyles,
    css`
      .data {
        display: flex;
        flex-flow: row wrap;
        gap: 60px;
        background-color: #fff;
        border-bottom: 3px solid var(--app-theme-border-color);
        padding-bottom: 30px;
      }

      .data-point {
        display: flex;
        flex-direction: column;
        flex-basis: 20%;
      }

      .data-point svg {
        --svg-size: 40px;
        width: var(--svg-size);
        height: var(--svg-size);
        display: block;
        color: var(--app-theme-color);
      }

      .data-value {
        display: flex;
        gap: 10px;
        align-items: flex-end;
      }

      .data-point h6 {
        font-size: 18px;
        font-weight: 600;
      }

      .data-point span {
        font-size: 18px;
        font-weight: 300;
      }

      h4 {
        font-size: 32px;
      }
    `,
  ];

  parseValue(field: CalculatorInputFields) {
    if (field.name === "serumCreatinine") {
      return (field.value as string) + " " + this.fields["unit"].value;
    }
    return field.value;
  }

  render() {
    if (!this.fields) {
      return;
    }
    console.log(this.classification);
    return html`
      <div class="data">
        ${Object.entries(this.fields).map(([key, field]) => {
          if (!field.icon) return;

          const faIcon = iconService.getIcon(field.icon!);
          return html`
            <div class="data-point">
              <h6>${this.#fieldMapper.map(key)}</h6>
              <div class="data-value">
                ${faIcon
                  ? html`<svg>${unsafeHTML(faIcon.html.join(""))}</svg>`
                  : nothing}
                <span>${this.parseValue(field)}</span>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "result-header": ResultHeader;
  }
}

export default ResultHeader;
