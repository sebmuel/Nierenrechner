import {TabSelectedEvent} from "./../types";
import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {appStyles} from "../styles/app-styles";

@customElement("app-tabs")
export class Tabs extends LitElement {
  static styles = [
    appStyles,
    css`
      :host {
        --app-tab-color: var(--app-theme-color-dark);
      }

      nav {
        display: flex;
      }
      nav > ::slotted([slot="tab"]) {
        padding: 1rem 0.5rem;
        flex: 1 1 auto;
        color: var(--app-tab-color, #fff);
        border-bottom: 2px solid var(--app-white, #fff);
        text-align: center;
        cursor: pointer;
      }
      nav > ::slotted([slot="tab"][selected]) {
        border-color: var(--app-tab-color, #fff);
      }
      ::slotted([slot="panel"]) {
        display: none;
      }
      ::slotted([slot="panel"][selected]) {
        display: block;
      }
    `,
  ];

  private _tabs: HTMLElement[] = [];
  private _panels: HTMLElement[] = [];

  firstUpdated() {
    const slotTabs = this.shadowRoot!.querySelector('slot[name="tab"]') as HTMLSlotElement;
    const slotPanels = this.shadowRoot!.querySelector('slot[name="panel"]') as HTMLSlotElement;

    this._tabs = slotTabs.assignedElements({ flatten: true }) as HTMLElement[];
    this._panels = slotPanels.assignedElements({
      flatten: true,
    }) as HTMLElement[];
    this.selectTab(0);
  }

  private selectTab(tabIndex: number) {
    this._tabs.forEach((tab) => tab.removeAttribute("selected"));
    this._panels.forEach((panel) => panel.removeAttribute("selected"));

    this._tabs[tabIndex]?.setAttribute("selected", "");
    this._panels[tabIndex]?.setAttribute("selected", "");
    this.dispatchEvent(
      new TabSelectedEvent("tab-select", {
        detail: { tabIndex },
      })
    );
  }

  private handleSelect(event: Event) {
    const clickedTab = event.composedPath().find((el) => this._tabs.includes(el as HTMLElement)) as
      | HTMLElement
      | undefined;

    console.log(event.composedPath());

    if (!clickedTab) return;

    const tabIndex = this._tabs.indexOf(clickedTab);
    if (tabIndex !== -1) {
      this.selectTab(tabIndex);
    }
  }

  render() {
    return html`
      <nav>
        <slot name="tab" @click=${this.handleSelect}></slot>
      </nav>
      <slot name="panel"></slot>
    `;
  }
}
