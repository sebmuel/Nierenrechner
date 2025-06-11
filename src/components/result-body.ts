import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Classification } from "../types";
import { appStyles } from "../styles/app-styles";
import "./grade-descriptions";
import "./classification-list";
import { classifications } from "../constants/classifications";

@customElement("result-body")
export default class ResultBody extends LitElement {
  @property({ type: Object }) private classification?: Classification;
  @property({ type: Number }) private score = 0;

  private renderValue(value: number) {
    return html`<div class="bold">${value} ml/min/1.73 m2</div>`;
  }

  private renderGrade(grade: string) {
    return html`<div class="bold">${grade}</div>
      <span class="grade-text">${this.classification!.text}</span>`;
  }

  renderResultTable() {
    return html` <table class="result-table">
      <tr>
        <th>Bezeichnung</th>
        <th>Wert</th>
      </tr>
      <tr>
        <td>eGFR</td>
        <td>${this.score} ml/min/1.73 m²</td>
      </tr>
      <tr>
        <td>Zustand</td>
        <td>
          <div>${this.classification?.description}</div>
        </td>
      </tr>
      <tr>
        <td>KDOQI</td>
        <td>
          <div>
            ${this.classification?.grade}
            <div class="grade-text">${this.classification?.text}</div>
          </div>
        </td>
      </tr>
    </table>`;
  }

  render() {
    return html`<div class="result">
        <h5>Ihr Ergebnis</h5>
        <div class="classification">${this.renderResultTable()}</div>
        <div>
          <grade-descriptions
            .measure=${this.classification!.measure}
            .symtoms=${this.classification!.symptoms}
            .mark=${this.classification!.mark}
          ></grade-descriptions>
        </div>
      </div>
      <div class="classification-list">
        <classification-list .classifications=${classifications}></classification-list>
      </div>`;
  }

  static styles = [
    appStyles,
    css`
      .classification-result {
        display: flex;
        justify-content: flex-start;
        gap: 10px;
        font-size: 20px;
      }

      .classification-result .key {
        width: 100%;
        max-width: 100px;
        font-weight: bold;
      }

      p {
        margin: 0;
        font-size: inherit;
        color: #000;
      }

      h5 {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #000;
        text-align: center;
        margin-bottom: 30px;
      }

      h6 {
        margin: 0;
        padding: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--app-theme-color);
        text-align: center;
        margin-bottom: 30px;
      }

      .grade-text {
        font-size: 1rem;
        font-weight: 400;
        color: #777272;
      }

      .result {
        padding: 30px 0;
        border-bottom: 3px solid var(--app-theme-border-color);
      }

      .classification {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
      }

      .left,
      .right {
        flex: 1;
        flex-basis: 50%;
        font-size: 1.5rem;
        font-weight: 400;
        display: flex;
        flex-direction: column;
        display: flex;
        flex-direction: column;
      }

      .right {
        align-items: flex-end;
      }
      .result-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        font-size: 1rem;
      }

      .result-table th,
      .result-table td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }

      .result-table th {
        background-color: #f5f5f5;
        font-weight: 600;
      }

      .bold {
        font-weight: 600;
      }

      .grade-text {
        font-size: 0.9rem;
        color: #777;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "result-body": ResultBody;
  }
}
