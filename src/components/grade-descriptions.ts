import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {appStyles} from "../styles/app-styles";

@customElement("grade-descriptions")
export default class GradeDesciptions extends LitElement {
  @property({ type: String })
  symtoms?: string;

  @property({ type: String })
  measure?: string;

  @property({ type: String })
  mark?: string;

  render() {
    return html`
      <div class="description">
        <h6>Symptome</h6>
        ${this.symtoms}
      </div>
      <div class="description">
        <h6>Maßnahme</h6>
        ${this.measure}
      </div>
      <div class="description">
        <h6>Kennzeichen</h6>
        ${this.mark}
      </div>
    `;
  }

  static styles = [
    appStyles,
    css`
      h6 {
        margin: 0;
        padding: 0;
        font-size: 01rem;
        font-weight: 600;
        color: #000;
        margin-bottom: 5px;
      }

      .description {
        padding: 10px;
          font-size: 16px;
          background-color: var(--app-theme-primary);
        border-radius: 5px;
      }
      .description:not(:last-child) {
        margin-bottom: 10px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "grade-descriptions": GradeDesciptions;
  }
}
