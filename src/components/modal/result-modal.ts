import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { CalcResult } from "../../classes/GfrResult";
import { appStyles } from "../../styles/app-styles";
import "../result-header";
import "../result-body";

@customElement("result-modal")
export class ResultModal extends LitElement {
  static styles = [
    appStyles,
    css`
      :host {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: none;
        justify-content: center;
        align-items: center;
        background-color: var(--app-modal-backdrop-color, rgba(0, 0, 0, 0.5));
        z-index: 1000;
      }

      :host(.open) {
        display: flex;
      }

      .modal {
        background-color: var(--app-modal-background-color, #fff);
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        padding: 20px;
        width: 100%;
        max-height: 95vh;
        overflow-y: auto;
        max-width: var(--app-modal-max-width, 1000px);
        color: var(--app-modal-font-color, #000);
      }

      .modal .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .modal .header .close {
        background-color: var(--app-theme-color, #fff);
        appearance: none;
        outline: none;
        border: var(--app-modal-close-button-border-width, 1px) solid
          var(--app-modal-close-button-border-color-rgb, transparent);
        border-radius: var(--app-modal-close-button-border-radius, 5px);
        padding: 5px;
        font-size: var(--app-modal-close-button-font-size, 1rem);
        font-weight: var(--app-modal-close-button-font-weight, 500);
        color: var(--app-modal-close-button-font-color, #000);
        width: 100;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
        cursor: pointer;
      }

      .modal .header h5 {
        font-size: var(--app-modal-headline-font-size, 1.5rem);
        font-weight: var(--app-modal-headline-font-weight, 600);
        color: var(--app-modal-headline-font-color, #000);
      }

      .modal .header h5 span {
        font-weight: 600;
        text-decoration: underline;
      }
    `,
  ];

  @property({ type: Object }) result?: CalcResult;
  @property({ type: Boolean }) open = false;

  close() {
    this.open = false;
    this.result = undefined;
    this.classList.remove("open");
  }

  private backdropClick(e: MouseEvent) {
    const path = e.composedPath();
    const modalEl = this.renderRoot.querySelector(".modal");
    if (modalEl && !path.includes(modalEl)) {
      this.close();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.backdropClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.backdropClick);
    super.disconnectedCallback();
  }

  mapType() {
    switch (this.result?.calculatorType) {
      case "CKD-EPI":
        return html`CKD-EPI-Formel`;
      case "MDRD":
        return html`MDRD-Formel`;
      default:
        throw new Error("Unknown calculator type");
    }
  }

  render() {
    if (!this.open) return html``;
    return html` <div class="modal">
      <div class="header">
        <h5>Berechnung eGFR nach <span>${this.mapType()}</span></h5>
        <button class="close" @click=${this.close}>X</button>
      </div>
      <div class="content">
        <result-header
          .classification=${this.result!.classification}
          .fields=${this.result!.formData}
        ></result-header>
        <result-body
          .score=${this.result?.value}
          .classification=${this.result?.classification}
        ></result-body>
      </div>
    </div>`;
  }
}
