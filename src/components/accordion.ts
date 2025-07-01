import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement("accessible-accordion")
export class AccessibleAccordion extends LitElement {
  static override styles = css`
    .accordion {
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 0 0 10px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    .accordion-header {
      background-color: #ffffff;
      color: var(--app-secondary-color);
      cursor: pointer;
      padding: 18px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
    }
    .accordion-header[aria-expanded="true"] {
      background-color: #ffffff;
    }
    .accordion-content {
      background-color: white;
      border-top: 1px solid #ccc;
      box-sizing: border-box;
      transition: max-height 0.6s ease;
      padding: 15px;
    }
    .accordion-content[aria-hidden="true"] {
      max-height: 0;
      overflow: hidden;
      padding: 0px;
      transition: max-height 0.6s ease;
    }

    .suffix {
      font-size: 18px;
      font-weight: 400;
    }

    .accordion-title {
      display: flex;
      gap: 30px;
      width: 100%;
    }

    .title {
      flex-basis: 150px;
    }
  `;

  constructor() {
    super();
  }

  @property({ type: Boolean }) expanded = false;
  @property({ type: String }) titleAccordion = "Default title";
  @property({ type: String }) titleSuffix: string = "";

  override render() {
    return html`
      <div class="accordion" tabindex="0" @keypress="${this.handleKeyDown}">
        <div
          class="accordion-header"
          role="button"
          aria-expanded="${this.expanded}"
          aria-controls="content-${this.id}"
          @click="${this.toggle}"
        >
          <div class="accordion-title">
            <span class="title">${this.titleAccordion}</span>
            <span class="suffix">${this.titleSuffix}</span>
          </div>
          <span aria-hidden="true">${this.expanded ? "−" : "+"}</span>
        </div>
        <div id="content-${this.id}" class="accordion-content" aria-hidden="${!this.expanded}">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggle();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "accessible-accordion": AccessibleAccordion;
  }
}
