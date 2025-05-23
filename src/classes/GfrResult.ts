export class GfrResult {
    constructor(public value: number, public unit: string) {}

    toString(): string {
        return `${this.value} ${this.unit}`;
    }
}