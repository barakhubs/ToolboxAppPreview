import { Icon } from "../types";
import { tileIcons } from "../utils/tile-icons";
import { AppVersionManager } from "./AppVersionManager";

export class ThemeManager {
  private version: AppVersionManager;

  homepage: any;
  constructor() {
    this.version = AppVersionManager.getInstance();
  }

  getTheme() {
    return this.version.theme;
  }

  getThemeIcons() {
    return tileIcons;
  }

  getThemeColors() {
    return this.version.theme?.Colors;
  }

  getThemeCtaColors() {
    return this.version.theme?.CtaColors;
  }

  getThemeColor(colorName: string): string | undefined {
    return this.getThemeColors()?.find((color) => color.ColorName === colorName)
      ?.ColorCode;
  }

  getThemeCtaColor(colorName: string) {
    if (!colorName) {
      colorName = "CtaColorOne";
    }
    return this.getThemeCtaColors()?.find(
      (color) =>
        color.CtaColorName.toLocaleLowerCase() === colorName.toLocaleLowerCase()
    )?.CtaColorCode;
  }

  getThemeIcon(iconName: string) {
    return this.getThemeIcons()?.find(
      (icon: Icon) =>
        icon.name.toLocaleLowerCase() === iconName.toLocaleLowerCase()
    )?.svg;
  }
}
