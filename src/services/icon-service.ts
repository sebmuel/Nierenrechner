import {
  icon,
  library,
  type Icon,
  type IconName,
} from "@fortawesome/fontawesome-svg-core";
import {
  faSyringe,
  faBirthdayCake,
  faMarsAndVenus,
} from "@fortawesome/free-solid-svg-icons";
import { logger } from "./debugger-logger";

export class IconService {
  constructor() {
    library.add(faSyringe, faBirthdayCake, faMarsAndVenus);
  }

  getIcon(iconName: IconName): Icon | null {
    const renderedIcon = icon({
      prefix: "fas",
      iconName: iconName,
    });

    if (renderedIcon === undefined) {
      logger.log(`Icon ${iconName} not found`);
    }

    return renderedIcon || null;
  }
}

export const iconService = new IconService();
