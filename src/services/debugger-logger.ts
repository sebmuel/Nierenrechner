class Logger {
  #isDebug = false;
  #logPrefix: string = `[nierenrechner][${new Date().toLocaleTimeString()}] `;
  #count: number = 1;

  constructor(locationSearch: string = typeof window !== "undefined" ? window.location.search : "") {
    const params = new URLSearchParams(locationSearch);

    if (params.get("debug")?.toLocaleLowerCase() === "true") {
      this.#isDebug = true;
      console.debug("[nierenrechner] debug enabled");
    }
  }

  log(message: string): void {
    if (!this.#isDebug) {
      return;
    }

    console.log(`${this.#count} ` + this.#logPrefix + message);
    this.#count++;
  }
}

export const logger = new Logger();
export { Logger };