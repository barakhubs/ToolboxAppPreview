import { PreviewApp } from "..";
import { AppVersionManager } from "../controls/AppVersionManager";
import { AppPreviewService } from "../services/AppPreviewService";

interface Language {
  code: string;
  label: string;
  flag: string;
}

export class HeaderComponent {
  private header: HTMLElement;
  private readonly languageList: Language[];
  private readonly versionLanguage: string;
  private language!: string;
  private versionManager: AppVersionManager;

  private static readonly LANGUAGES: Language[] = [
    {
      code: "en",
      label: "English",
      flag: `<svg xmlns="http://www.w3.org/2000/svg" id="Group_2517" data-name="Group 2517" width="14" height="14" viewBox="0 0 18 18"><path id="Path_2463" data-name="Path 2463" d="M13.366,4.656A8.994,8.994,0,0,0,8.757,7.542l4.609,2.818Z" transform="translate(-6.616 -4.361)" fill="#3f51b5"/><path id="Path_2464" data-name="Path 2464" d="M8.6,33.269a9,9,0,0,0,4.678,2.961V30.41Z" transform="translate(-6.533 -18.526)" fill="#3f51b5"/><path id="Path_2465" data-name="Path 2465" d="M4.656,29c.006.023.012.046.018.07L4.787,29Z" transform="translate(-4.361 -17.75)" fill="#fff"/><path id="Path_2466" data-name="Path 2466" d="M33.759,7.722A9,9,0,0,0,29,4.656v5.975Z" transform="translate(-17.75 -4.361)" fill="#3f51b5"/><path id="Path_2467" data-name="Path 2467" d="M29,35.9a8.994,8.994,0,0,0,4.82-3.147L29,29.8Z" transform="translate(-17.75 -18.192)" fill="#3f51b5"/><path id="Path_2468" data-name="Path 2468" d="M4.7,18.621c-.016.056-.029.114-.044.171h.323Z" transform="translate(-4.361 -12.042)" fill="#fff"/><path id="Path_2469" data-name="Path 2469" d="M41.876,19.978q-.064-.425-.167-.836l-1.368.836Z" transform="translate(-23.988 -12.328)" fill="#fff"/><path id="Path_2470" data-name="Path 2470" d="M4.755,19H4.432a9,9,0,0,0-.183.9H6.227Z" transform="translate(-4.137 -12.25)" fill="#fff"/><path id="Path_2471" data-name="Path 2471" d="M41.974,27.733c.057-.241.1-.486.14-.733h-1.34Z" transform="translate(-24.226 -16.65)" fill="#fff"/><path id="Path_2472" data-name="Path 2472" d="M6.036,27H4.249a8.877,8.877,0,0,0,.183.9h.132Z" transform="translate(-4.137 -16.65)" fill="#fff"/><path id="Path_2473" data-name="Path 2473" d="M19.9,10.686V4.249a8.876,8.876,0,0,0-.9.183v5.7Z" transform="translate(-12.25 -4.137)" fill="#fff"/><path id="Path_2474" data-name="Path 2474" d="M27,28.582v6.826a8.877,8.877,0,0,0,.9-.183V29.132Z" transform="translate(-16.65 -17.52)" fill="#fff"/><path id="Path_2475" data-name="Path 2475" d="M19,29.738v5.82a9,9,0,0,0,.9.183V29.188Z" transform="translate(-12.25 -17.853)" fill="#fff"/><path id="Path_2476" data-name="Path 2476" d="M27.083,10.749l.128.078.689-.421V4.432a9,9,0,0,0-.9-.183v6.637Z" transform="translate(-16.65 -4.137)" fill="#fff"/><path id="Path_2477" data-name="Path 2477" d="M6.5,15.538h4.225l1.334-.815v-.285l-.9-.55L6.554,11.069a9.042,9.042,0,0,0-1.016,1.466l3.4,2.1H6.481L5,13.717q-.139.369-.247.751l.279.171Z" transform="translate(-4.414 -7.888)" fill="#fff"/><path id="Path_2478" data-name="Path 2478" d="M27.469,14.8l1.57.959h4.223l1.368-.836a8.9,8.9,0,0,0-.6-1.679l-2.593,1.616H28.978l4.415-2.745c-.149-.222-.309-.436-.477-.644l-4.759,2.908Z" transform="translate(-16.908 -8.108)" fill="#fff"/><path id="Path_2479" data-name="Path 2479" d="M9.239,16.429l-3.4-2.1A8.935,8.935,0,0,0,5.3,15.508l1.481.921Z" transform="translate(-4.716 -9.679)" fill="#e53935"/><path id="Path_2480" data-name="Path 2480" d="M33.277,15.646l2.593-1.615a8.956,8.956,0,0,0-.633-1.129l-4.416,2.745Z" transform="translate(-18.752 -8.896)" fill="#e53935"/><path id="Path_2481" data-name="Path 2481" d="M27,27v.712l.9.55,4.82,2.946a9,9,0,0,0,.916-1.417L30.587,27.9h2.455l1.107.69a8.83,8.83,0,0,0,.249-.857L33.2,27Z" transform="translate(-16.65 -16.65)" fill="#fff"/><path id="Path_2482" data-name="Path 2482" d="M28.781,19.732l-1.57-.959-.128-.078L27,18.83v.9Z" transform="translate(-16.65 -12.082)" fill="#fff"/><path id="Path_2483" data-name="Path 2483" d="M12.032,27.985V27H6.281l-1.472.9-.114.07a8.927,8.927,0,0,0,.645,1.7L8.13,27.9h2.455L6,30.795c.143.205.292.407.451.6l4.678-2.859Z" transform="translate(-4.382 -16.65)" fill="#fff"/><path id="Path_2484" data-name="Path 2484" d="M18.035,20h1.334v-.815Z" transform="translate(-11.719 -12.353)" fill="#fff"/><path id="Path_2485" data-name="Path 2485" d="M34.971,29l3.049,1.89a8.944,8.944,0,0,0,.513-1.2L37.426,29Z" transform="translate(-21.034 -17.75)" fill="#e53935"/><path id="Path_2486" data-name="Path 2486" d="M8.918,29l-2.79,1.773a8.97,8.97,0,0,0,.664,1.121L11.374,29Z" transform="translate(-5.17 -17.75)" fill="#e53935"/><path id="Path_2487" data-name="Path 2487" d="M28.781,21H27v2.7h7.538a8.188,8.188,0,0,0,0-2.7H28.781Z" transform="translate(-16.65 -13.35)" fill="#e53935"/><path id="Path_2488" data-name="Path 2488" d="M11.65,23.7V21H4.112a8.189,8.189,0,0,0,0,2.7H11.65Z" transform="translate(-4 -13.35)" fill="#e53935"/><path id="Path_2489" data-name="Path 2489" d="M23.7,21.888V4.112a8.189,8.189,0,0,0-2.7,0V21.888a8.189,8.189,0,0,0,2.7,0Z" transform="translate(-13.35 -4)" fill="#e53935"/></svg>`,
    },
    {
      code: "nl",
      label: "Nederlands",
      flag: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18"><g id="Group_2534" data-name="Group 2534" transform="translate(-4 -4)"><path id="Path_2500" data-name="Path 2500" d="M22.128,31H5.284a8.988,8.988,0,0,0,16.844,0Z" transform="translate(-0.706 -14.85)" fill="#3f51b5"/><path id="Path_2501" data-name="Path 2501" d="M13.706,4A9,9,0,0,0,5.284,9.85H22.128A8.994,8.994,0,0,0,13.706,4Z" transform="translate(-0.706)" fill="#ff3d00"/><path id="Path_2502" data-name="Path 2502" d="M22,20.15A8.966,8.966,0,0,0,21.422,17H4.578a8.875,8.875,0,0,0,0,6.3H21.422A8.956,8.956,0,0,0,22,20.15Z" transform="translate(0 -7.15)" fill="#eceff1"/></g></svg>`,
    },
    // {
    //   code: "de",
    //   label: "German",
    //   flag: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18"><g id="Group_2534" data-name="Group 2534" transform="translate(-4 -4)"><path id="Path_2500" data-name="Path 2500" d="M22.128,31H5.284a8.988,8.988,0,0,0,16.844,0Z" transform="translate(-0.706 -14.85)" fill="#3f51b5"/><path id="Path_2501" data-name="Path 2501" d="M13.706,4A9,9,0,0,0,5.284,9.85H22.128A8.994,8.994,0,0,0,13.706,4Z" transform="translate(-0.706)" fill="#ff3d00"/><path id="Path_2502" data-name="Path 2502" d="M22,20.15A8.966,8.966,0,0,0,21.422,17H4.578a8.875,8.875,0,0,0,0,6.3H21.422A8.956,8.956,0,0,0,22,20.15Z" transform="translate(0 -7.15)" fill="#eceff1"/></g></svg>`,
    // },
  ];

  constructor() {
    this.versionManager = AppVersionManager.getInstance();
    this.versionLanguage = this.versionManager.versionLanguage || "en";
    this.languageList = [...HeaderComponent.LANGUAGES];
    this.header = document.createElement("div");
    this.init();
  }

  private init() {
    this.header.classList.add("tbap-header");

    const clock = document.createElement("span");
    clock.id = "clock";
    clock.innerText = "8:34 PM";

    const icons = document.createElement("span");
    icons.classList.add("icons");

    const signal = document.createElement("i");
    signal.classList.add("fas", "fa-signal");

    const wifi = document.createElement("i");
    wifi.classList.add("fas", "fa-wifi");

    const battery = document.createElement("i");
    battery.classList.add("fas", "fa-battery");

    icons.appendChild(this.createLanguageDropdown());
    icons.appendChild(signal);
    icons.appendChild(wifi);
    icons.appendChild(battery);

    this.header.appendChild(clock);
    this.header.appendChild(icons);
  }

  private getAvailableLanguages(): Language[] {
    // return this.languageList.filter(
    //   (lang) => lang.code !== this.versionLanguage
    // );
    return this.languageList;
  }

  private getSelectedLanguage(): Language {
    return (
      this.languageList.find((lang) => lang.code === this.versionLanguage) ||
      HeaderComponent.LANGUAGES[0]
    );
  }

  private createLanguageDropdown(): HTMLDivElement {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.className = "language-dropdown";
    dropdownContainer.style.cssText =
      "position: relative; display: inline-block;";

    const availableLanguages = this.getAvailableLanguages();

    const currentLang = this.getSelectedLanguage();

    this.language = currentLang.code;

    // Dropdown button
    const dropdownButton = document.createElement("button");
    dropdownButton.className = "language-dropdown-button";
    dropdownButton.style.cssText = `
      background: none; 
      border: none; 
      cursor: pointer; 
      padding: 0; 
      display: flex; 
      align-items: center;
      border-radius: 4px;
    `;
    dropdownButton.innerHTML = currentLang.flag;

    // Dropdown menu
    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = "language-dropdown-menu";
    dropdownMenu.style.cssText = `
      position: absolute;
      top: 100%;
      left: -6px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: none;
      z-index: 1000;
    `;

    availableLanguages.forEach((language) => {
      const item = document.createElement("div");
      item.className = "language-dropdown-item";
      item.style.cssText = `
        padding: 4px 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        border-bottom: 1px solid #eee;
      `;
      item.innerHTML = `${language.flag}`;

      if (language.code === this.language) {
        item.style.backgroundColor = "#f0f0f0";
      }

      item.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        this.changeLanguage(language.code);
        dropdownMenu.style.display = "none";
      });

      item.addEventListener("mouseenter", (e: MouseEvent) => {
        e.preventDefault();
        item.style.backgroundColor = "#f5f5f5";
      });

      item.addEventListener("mouseleave", (e: MouseEvent) => {
        e.preventDefault();
        item.style.backgroundColor =
          language.code === this.language ? "#f0f0f0" : "transparent";
      });

      dropdownMenu.appendChild(item);
    });

    dropdownButton.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const isVisible = dropdownMenu.style.display === "block";
      dropdownMenu.style.display = isVisible ? "none" : "block";
    });

    document.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      dropdownMenu.style.display = "none";
    });

    dropdownContainer.appendChild(dropdownButton);
    dropdownContainer.appendChild(dropdownMenu);

    return dropdownContainer;
  }

  private async changeLanguage(languageCode: string): Promise<void> {
    this.language = languageCode;

    const button = document.querySelector(".language-dropdown-button");
    const newLang = HeaderComponent.LANGUAGES.find(
      (lang) => lang.code === languageCode
    );
    if (button && newLang) {
      button.innerHTML = newLang.flag;
    }

    if (!this.versionManager.version) return;

    const pageContainer = document.querySelector(".tbap-page-container");
    if (pageContainer) {
      pageContainer.classList.add("loading");
    }

    const appPreviewService = new AppPreviewService();
    await appPreviewService
      .getTranslatedVersion(
        this.versionManager.version.AppVersionId,
        newLang?.code || "en"
      )
      .then((response) => {
        if (pageContainer) {
          pageContainer.classList.remove("loading");
        }
        this.versionManager._isInitialized = false;
        new PreviewApp(response.SDT_AppPreviewVersion);
      })
      .catch((error) => {
        if (pageContainer) {
          pageContainer.classList.remove("loading");
        }
        throw new Error(`Failed to change language: ${error}`);
      });
  }

  render(container: HTMLElement) {
    container.appendChild(this.header);
  }
}
