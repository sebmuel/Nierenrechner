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
    return html`<p>eGFR: <b>${value}</b> ml/min/1.73 m2</p>`;
  }

  private renderGrade(grade: string) {
    return html`<p>KDOQI: ${grade}</p>
      <span class="grade-text">${this.classification!.text}</span>`;
  }

  render() {
    return html`<div class="result">
      <h5>Ihr Ergebnis</h5>
      <div class="classification">
        <div class="left">${this.renderValue(this.score)}</div>
        <div class="right">${this.renderGrade(this.classification!.grade)}</div>
      </div>
      <div>
        <grade-descriptions
          .measure=${this.classification!.measure}
          .symtoms=${this.classification!.symptoms}
          .mark=${this.classification!.mark}
        ></grade-descriptions>
        <div class="classification-list">
          <classification-list
            .classifications=${classifications}
          ></classification-list>
        </div>
      </div>
    </div>`;
  }

  static styles = [
    appStyles,
    css`
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
        flex-direction: row;
        justify-content: space-between;
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "result-body": ResultBody;
  }
}
