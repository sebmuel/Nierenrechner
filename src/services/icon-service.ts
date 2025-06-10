import {
  icon,
  library,
  type Icon,
  type IconName,
} from "@fortawesome/fontawesome-svg-core";
import {
  faSyringe,
  faBirthdayCake,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

export class IconService {
  constructor() {
    library.add(faSyringe, faBirthdayCake, faVenusMars);
  }

  getIcon(iconName: IconName): Icon | null {
    const renderedIcon = icon({
      prefix: "fas",
      iconName: iconName,
    });
    return renderedIcon || null;
  }
}

export const iconService = new IconService();
