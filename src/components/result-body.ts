import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Classification } from "../types";
import { appStyles } from "../styles/app-styles";

@customElement("result-body")
export default class ResultBody extends LitElement {
  @property({ type: Object }) private classification?: Classification;
  @property({ type: Number }) private score = 0;

  render() {
    return html`<div class="result">
      <span class="score">${this.score}</span>
      <span class="classification">${this.classification?.name}</span>
    </div>`;
  }

  static styles = [
    appStyles,
    css`
      .result {
        padding: 30px 0;
        border-bottom: 3px solid var(--app-theme-border-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "result-body": ResultBody;
  }
}
