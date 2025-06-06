import { appStyles } from "./styles/app-styles";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { logger } from "./services/debugger-logger";
import { nierenrechnerStyles } from "./styles/nierenrechner-styles";
import type { TabSelectedData } from "./types";
import "./components/tabs";
import "./components/calculators/cmkd-epi-calculator";
import "./components/modal/result-modal";
import type { ResultModal } from "./components/modal/result-modal";
import type { GfrResult } from "./classes/GfrResult";

@customElement("app-nierenrechner")
export class Nierenrechner extends LitElement {
  static styles? = [appStyles, nierenrechnerStyles];

  protected render() {
    return html`
      <div id="nierenrechner">
        <result-modal></result-modal>
        <div class="rechner">
          <app-tabs>
            <h2 slot="tab">CKD-EPI-Formel</h2>
            <section slot="panel"><app-cmkd-epi-calculator /></section>
            <h2 slot="tab">Tab 2 Tab 2</h2>
            <section slot="panel">Content for tab 2</section>
            <h2 slot="tab">Tab 3 Tab 2</h2>
            <section slot="panel">Content for tab 3</section>
            <h2 slot="tab">Tab 4 Tab 2</h2>
            <section slot="panel">Content for tab 4</section>
            <h2 slot="tab">Tab 5 Tab 2</h2>
            <section slot="panel">Content for tab 5</section>
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
      const eventDetail = (event as CustomEvent<GfrResult>).detail;
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
