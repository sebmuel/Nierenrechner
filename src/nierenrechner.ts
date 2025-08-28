import {appStyles} from "./styles/app-styles";
import {html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {logger} from "./services/debugger-logger";
import {nierenrechnerStyles} from "./styles/nierenrechner-styles";
import type {TabSelectedData} from "./types";
import "./components/tabs";
import "./components/calculators/ckd-epi-calculator";
import "./components/calculators/mdrd-calculator";
import "./components/calculators/mayo-calculator";
import "./components/calculators/ckd-epi-cystatin-calculator";
import "./components/calculators/cockcroft-gault-calculator";
import "./components/calculators/ckd-epi-creatinine-cystatin-calculator";
import "./components/modal/result-modal";
import type {ResultModal} from "./components/modal/result-modal";
import type {CalcResult} from "./classes/GfrResult";

@customElement("app-nierenrechner")
export class Nierenrechner extends LitElement {
  static styles? = [appStyles, nierenrechnerStyles];
  
  @property({ type: Boolean }) ckdEpi = false;
    @property({ type: Boolean }) mdrd = false;
    @property({ type: Boolean }) mayo = false;
    @property({ type: Boolean }) ckdEpiCystatin = false;
    @property({ type: Boolean }) ckdEpiKreatininCystatin = false;
    @property({ type: Boolean }) cockcroftGault = false;

  protected render() {
    if( !this.ckdEpi && !this.mdrd && !this.mayo && !this.ckdEpiCystatin && !this.ckdEpiKreatininCystatin && !this.cockcroftGault) {
      this.ckdEpi = true;
      console.warn("No calculator selected. Defaulting to CKD-EPI");
    }
    return html`
      <div id="nierenrechner">
        <result-modal></result-modal>
        <div class="rechner">
          <app-tabs>
            ${this.ckdEpi ? html`<div slot="tab">CKD-EPI-Formel</div>
            <section slot="panel">
                <app-ckd-epi-calculator></app-ckd-epi-calculator>
            </section>` : html``}
            
            ${this.mdrd ? html`<div slot="tab">MDRD eGFR-Formel</div>
            <section slot="panel">
              <app-mdrd-calculator></app-mdrd-calculator>
            </section>` : html``}
            
            ${this.mayo ? html`<div slot="tab">Mayo eGFR-Formel</div>
            <section slot="panel">
              <app-mayo-calculator></app-mayo-calculator>
            </section>` : html``}
            
            ${this.ckdEpiCystatin ? html`<div slot="tab">CKD-EPI-Formel für Cystatin C</div>
            <section slot="panel">
              <app-ckd-epi-cystatin-calculator></app-ckd-epi-cystatin-calculator>
            </section>` : html``}

            ${this.ckdEpiKreatininCystatin ? html`<div slot="tab">CKD-EPI-Formel für Kreatinin & Cystatin C</div>
            <section slot="panel">
              <app-ckd-epi-creatinine-cystatin-calculator></app-ckd-epi-creatinine-cystatin-calculator>
            </section>` : html``}
            
            ${this.cockcroftGault ? html` <div slot="tab">Cockcroft und Gault</div>
            <section slot="panel">
              <app-cockcroft-gault-calculator></app-cockcroft-gault-calculator>
            </section>` : html``}
          </app-tabs>
        </div>
      </div>
    `;
  }

  constructor() {
    super();
    this.addEventListener("tab-select", (event: Event) => {
      const eventDetail = (event as CustomEvent<TabSelectedData>).detail;
      logger.log(`Tab ${eventDetail.tabIndex} selected`);
    });
    this.addEventListener("result", (event: Event) => {
      const eventDetail = (event as CustomEvent<CalcResult>).detail;
      console.log(eventDetail);
      const modal = this.shadowRoot!.querySelector("result-modal") as ResultModal;

      modal.result = eventDetail;
      modal.open = true;
      modal.classList.add("open");
    });
  }

  public connectedCallback() {
    super.connectedCallback();
    logger.log("App Mounted");
  }
}
