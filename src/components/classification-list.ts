import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Classification } from "../types";

@customElement("classification-list")
export default class ClassificationList extends LitElement {
  @property({ type: Array }) classifications: Array<Classification> = [];
  constructor() {
    super();
  }

  render() {
    return html`<ul>
      ${this.classifications.map(
        (classification) => html`<li>${classification.name}</li>`
      )}
    </ul>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "classification-list": ClassificationList;
  }
}
