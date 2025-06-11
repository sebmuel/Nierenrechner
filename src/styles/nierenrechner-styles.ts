import { css } from "lit";

export const nierenrechnerStyles = css`
  div[slot="tab"] {
    font-size: var(--app-tab-font-size, 1rem);
    font-weight: bold;
  }

  #nierenrechner {
    background-color: var(--app-theme-color, #89c58d);
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }

  .rechner {
    padding: 36px;
    display: block;
    width: 100%;
  }
`;
