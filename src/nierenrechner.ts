import { appStyles } from "./styles/app-styles";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { logger } from "./services/debugger-logger";
import { nierenrechnerStyles } from "./styles/nierenrechner-styles";
import type { TabSelectedData } from "./types";
import "./components/tabs";
import "./components/mdrd-rechner";

@customElement("app-nierenrechner")
export class Nierenrechner extends LitElement {
  static styles? = [appStyles, nierenrechnerStyles];

  protected render() {
    return html`
      <div id="nierenrechner">
        <div class="rechner">
          <app-tabs>
            <h2 slot="tab">Tab 1</h2>
            <section slot="panel">
              <mdrd-egfr-calculator></mdrd-egfr-calculator>
            </section>
            <h2 slot="tab">Tab 2</h2>
            <section slot="panel">Content for tab 2</section>
            <h2 slot="tab">Tab 3</h2>
            <section slot="panel">Content for tab 3</section>
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
  }

  public connectedCallback() {
    super.connectedCallback();
    logger.log("App Mounted");
  }
}
