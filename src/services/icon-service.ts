import {icon, type Icon, type IconName, library,} from "@fortawesome/fontawesome-svg-core";
import {faBirthdayCake, faMarsAndVenus, faSyringe, faUser, faWeightScale,} from "@fortawesome/free-solid-svg-icons";
import {logger} from "./debugger-logger";

export class IconService {
  constructor() {
    library.add(faSyringe, faBirthdayCake, faMarsAndVenus, faUser, faWeightScale);
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
