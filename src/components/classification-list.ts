import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Classification } from "../types";
import "./accordion";
import { appStyles } from "../styles/app-styles";

@customElement("classification-list")
export default class ClassificationList extends LitElement {
  @property({ type: Array }) classifications: Array<Classification> = [];
  constructor() {
    super();
  }

  render() {
    return html`<div class="classifications">
      ${this.classifications.map((classification) => {
        return html`<accessible-accordion
          .titleAccordion=${classification.name}
          .titleSuffix=${classification.text}
        >
          <div class="classification" slot="content">
            <h5>${classification.description}</h5>
            <div class="classification-grid">
              <div class="classification-field">
                <h6>Symptome</h6>
                ${classification.symptoms}
              </div>
              <div class="classification-field">
                <h6>Maßnahme</h6>
                ${classification.measure}
              </div>
              <div class="classification-field">
                <h6>Kennzeichen</h6>
                ${classification.mark}
              </div>
            </div>
          </div>
        </accessible-accordion>`;
      })}
    </div>`;
  }

  static styles? = [
    appStyles,
    css`
      .classifications {
        margin-top: 30px;
      }

      h6 {
        margin: 0;
        padding: 0;
        font-size: 01rem;
        font-weight: 600;
        color: #000;
        margin-bottom: 5px;
      }

      h5 {
        margin: 0;
        padding: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #000;
        margin-bottom: 10px;
      }

      .classification-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
      }

      .classification-field {
        padding: 10px;
        background-color: var(--app-gray);
        color: #000;
        border-radius: 5px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "classification-list": ClassificationList;
  }
}
