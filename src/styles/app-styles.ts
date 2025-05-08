import { css } from "lit";

export const appStyles = css`
  :host {
    display: inline-block;
    --app-theme-color: #89c58d;
    --app-secondary-theme-color: #008bd2;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 0.5rem 0;
    font-weight: 300;
  }

  p,
  section {
    margin: 0 0 1rem 0;
  }
`;
