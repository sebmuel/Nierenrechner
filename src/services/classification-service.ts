import { classifications } from "../constants/classifications";
import type { Classification } from "../types";

class ClassificationService {
  #classifications: Classification[] = classifications;

  getClassificationByScore(score: number) {
    return this.#classifications.find((c) => score >= c.min && score <= c.max);
  }
}

export default new ClassificationService();
