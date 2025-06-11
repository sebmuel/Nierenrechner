import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("calc-description")
export class DescriptionElement extends LitElement {
  static styles = css`
    #decription {
      margin-bottom: 30px;
    }

    #decription ::slotted([slot="headline"]) {
      font-size: var(--app-description-headline-font-size, 2rem);
      color: var(--app-description-headline-color, #fff);
      font-weight: var(--app-description-headline-font-weight, 600);
    }
  `;

  render() {
    return html`
      <div id="decription">
        <slot name="headline"></slot>
        <slot name="description"></slot>
      </div>
    `;
  }
}
