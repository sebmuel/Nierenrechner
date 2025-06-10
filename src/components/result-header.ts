import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { CalculatorInputFields } from "../types";
import FieldMapper from "../services/field-mapper";
import { iconService } from "../services/icon-service";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("result-header")
export class ResultHeader extends LitElement {
  @property({ type: Object })
  fields: Record<string, CalculatorInputFields> = {};
  #fieldMapper = new FieldMapper();

  render() {
    console.log(this.fields);
    if (!this.fields) {
      return;
    }

    return html`
      ${Object.entries(this.fields).map(([key, field]) => {
        const faIcon = iconService.getIcon(field.icon);
        return html`
          <div>
            <span>${this.#fieldMapper.map(key)}</span>
            <span>${field.value}</span>
            <span>${faIcon ? unsafeHTML(faIcon.html.join("")) : nothing}</span>
          </div>
        `;
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "result-header": ResultHeader;
  }
}

export default ResultHeader;
