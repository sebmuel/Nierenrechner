import {css} from "lit";

export const appStyles = css`
  .nierenrechner {
    position: relative;
  }

  :host {
    display: inline-block;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    --app-theme-color: #85b9d4;
    --app-secondary-color: #008bd2;
    --app-theme-color-dark: #008AD2;
    --app-theme-border-color: rgb(79, 118, 82);
    --app-gray: #606060;
    --app-white: #ffffff;
    --app-max-width: 1000px;
  }

  #nierenrechner {
    max-width: var(--app-max-width, 100%);
    margin: 0 auto;
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
    font-weight: 600;
    color: var(--app-headline-color, #0089D2);
  }

  p {
    font-size: var(--app-paragraph-font-size, 1rem);
    line-height: var(--app-paragraph-line-height, 1.3);
    font-weight: var(--app-paragraph-font-weight, 400);
    color: var(--app-paragraph-font-color, var(--app-white));
  }

  p,
  section {
    margin: 0 0 1rem 0;
  }

  .calc-wrapper {
    padding: 36px 0;
    display: block;
    width: 100%;
  }

  .input-wrapper {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
  }

  .input-wrapper label {
    font-size: var(--app-input-label-font-size, 1rem);
    font-weight: var(--app-input-label-font-weight, 400);
    color: var(--app-input-label-font-color, var(--app-white));
    margin-bottom: 5px;
  }

  .input-wrapper input[type="number"],
  .input-wrapper input[type="text"],
  .input-wrapper select {
    background-color: var(--app-input-background-color, #ffffff);
    outline: none;
    border: var(--app-input-border-width, 1px) solid var(--app-input-border-color-rgb, rgb(0, 0, 0));
    border-radius: var(--app-input-border-radius, 5px);
    padding: 10px;
    font-size: var(--app-input-font-size, 1rem);
    font-weight: var(--app-input-font-weight, 400);
    color: var(--app-input-font-color, #000);
    width: 100%;
  }

  .input-wrapper input[type="number"]:focus,
  .input-wrapper input[type="text"]:focus,
  .input-wrapper select:focus {
    outline: none;
    border-color: var(--app-input-border-color-focus-rgb, var(--app-secondary-color, #000));
  }

  .calc-wrapper button[type="submit"] {
    background-color: var(--app-button-background-color, var(--app-theme-color-dark));
    appearance: none;
    outline: none;
    border: var(--app-button-border-width, 1px) solid
      var(--app-input-border-color-rgb, var(--app-theme-color-dark, #000));
    border-radius: var(--app-button-border-radius, 5px);
    padding: 10px;
    font-size: var(--app-button-font-size, 1rem);
    font-weight: var(--app-button-font-weight, 500);
    color: var(--app-button-font-color, #fff);
    width: 100;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    cursor: pointer;
  }

  .calc-wrapper button[type="submit"]:hover {
    background-color: var(--app-button-background-color-hover, transparent);
    color: var(--app-button-font-color-hover, #000);
    border-color: var(--app-button-border-color-hover-rgb, rgb(0, 0, 0));
  }
`;
