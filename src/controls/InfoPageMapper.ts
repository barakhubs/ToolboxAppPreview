import { CtaComponent } from "../components/CtaComponent";
import { TileComponent } from "../components/TileComponent";
import { Content } from "../interfaces/Content";
import { Cta } from "../interfaces/Cta";
import { PageInfoContentStructure } from "../interfaces/PageInfoContentStructure";
import { Page } from "../interfaces/Page";
import { Row } from "../interfaces/Row";
import { Tile } from "../interfaces/Tile";
import { InfoType } from "../interfaces/InfoType";
import { Image } from "../interfaces/Image";

export class InfoPageMapper {
  pageData: PageInfoContentStructure;
  pageId: string;

  constructor(page: Page) {
    this.pageId = page.PageId;
    this.pageData = page.PageInfoStructure;
  }

  private renderImage(content: InfoType) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("tbap-image-container");
    const slideContainer = document.createElement("div");
    slideContainer.classList.add("tbap-img-slide-container");

    const images = content?.Images;
    let currentSlide = 0;
    let isTransitioning = false; // Prevent rapid clicks during transition

    images?.forEach((image: Image, index: number) => {
      const imgElement = this.singleImageElement(image, index, images?.length);
      slideContainer.appendChild(imgElement);
    });

    const rightArrow = document.createElement("span");
    rightArrow.classList.add("tbap-img-slide-arrow-right");
    rightArrow.innerHTML = "&#10095;";

    const leftArrow = document.createElement("span");
    leftArrow.classList.add("tbap-img-slide-arrow-left");
    leftArrow.innerHTML = "&#10094;";

    // Function to show specific slide with smooth fade
    const showSlide = (index: number) => {
      if (isTransitioning) return; // Prevent overlapping transitions
      
      isTransitioning = true;
      const slides = slideContainer.querySelectorAll(
        ".tbap-img-slide"
      ) as NodeListOf<HTMLDivElement>;
      const indicators = slideContainer.querySelectorAll(
        ".tbap-img-slide-indicator"
      ) as NodeListOf<HTMLSpanElement>;

      slides.forEach((slide, i) => {
        if (i === index) {
          // Show the target slide
          slide.style.opacity = "1";
          slide.style.zIndex = "2";
        } else {
          // Fade out other slides
          slide.style.opacity = "0";
          slide.style.zIndex = "1";
        }
      });

      // Update indicators
      indicators.forEach((indicator, i) => {
        indicator.innerHTML = `${index + 1}/${images?.length}`;
      });

      // Reset transition lock after animation completes
      setTimeout(() => {
        isTransitioning = false;
      }, 500); // Match the CSS transition duration
    };

    rightArrow.addEventListener("click", () => {
      if (images && images.length > 1 && !isTransitioning) {
        currentSlide = (currentSlide + 1) % images.length;
        showSlide(currentSlide);
      }
    });

    leftArrow.addEventListener("click", () => {
      if (images && images.length > 1 && !isTransitioning) {
        currentSlide =
          currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
      }
    });

    if (images && images.length > 1) {
      slideContainer.appendChild(leftArrow);
      slideContainer.appendChild(rightArrow);
    }

    imageContainer.appendChild(slideContainer);
    return imageContainer;
  }

  private singleImageElement(
    image: Image,
    index: number,
    length: number
  ): HTMLDivElement {
    const imageElement = document.createElement("div");
    imageElement.className = "tbap-img-slide";
    
    // Set initial opacity and position
    const initialOpacity = index === 0 ? "1" : "0";
    imageElement.style.cssText = `
      opacity: ${initialOpacity};
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: opacity 0.5s ease-in-out;
      z-index: ${index === 0 ? "2" : "1"};
    `;

    const indicator = document.createElement("span");
    indicator.className = "tbap-img-slide-indicator";
    indicator.innerHTML = `${index + 1}/${length}`;

    const img = document.createElement("img");
    img.src = image.InfoImageValue || "";
    img.alt = image.InfoImageId || "";
    img.className = "tbap-img-slide-image";

    if (length > 1) imageElement.appendChild(indicator);

    imageElement.appendChild(img);
    return imageElement;
  }

  private renderDescription(content: InfoType) {
    const description = document.createElement("div");
    description.classList.add("tbap-description-container");
    if (content?.InfoValue) {
      description.innerHTML = content?.InfoValue;
    }
    return description;
  }

  private renderTileRow(row: InfoType): HTMLElement {
    const hasSingleTile = row.Tiles?.length === 1;
    const isHighPriorityRow = hasSingleTile;

    const rowElement = document.createElement("div");
    rowElement.className = "tbap-row";
    rowElement.id = row.InfoId;
    if (row.Tiles) {
      const rowTileLength = row.Tiles.length;
      row?.Tiles.forEach((tile, index) => {
        // const isHighPriority = isHighPriorityRow && index === 0;
        const isHighPriority = isHighPriorityRow;
        const tileComponent = new TileComponent(
          tile,
          isHighPriority,
          this.pageId,
          rowTileLength
        );
        rowElement.appendChild(tileComponent.getElement());
      });
    }

    return rowElement;
  }

  private renderCta(content: InfoType): HTMLElement | null {
    const ctaContainer = document.createElement("div");
    ctaContainer.className = "tbap-cta-container";
    if (!content.CtaAttributes) return null;
    const ctaElement = new CtaComponent(content.CtaAttributes);
    const ctaButton = ctaElement.getCta();
    ctaButton.addEventListener("click", () => {
      ctaElement.handleCtaClick(content.CtaAttributes);
    });
    ctaContainer.appendChild(ctaButton);
    return ctaContainer;
  }

  renderContent(container: HTMLElement): void {
    if (!this.pageData?.InfoContent?.length) {
      const emptyContent = document.createElement("div");
      emptyContent.className = "tbap-empty";
      emptyContent.innerText = "No content available";
      container.appendChild(emptyContent);
      return;
    }

    const columnElement = document.createElement("div");
    columnElement.className = "tbap-content-column";

    this.pageData.InfoContent.forEach((content: InfoType) => {
      let contentEl: HTMLElement | null = null;
      if (content.InfoType === "Images" && content.Images) {
        contentEl = this.renderImage(content);
        console.log("contentEl", contentEl);
      } else if (content.InfoType === "Description" && content.InfoValue) {
        contentEl = this.renderDescription(content);
      } else if (content.InfoType === "Cta" && content.CtaAttributes) {
        contentEl = this.renderCta(content);
        // columnElement.appendChild(contentEl);
      } else if (content.InfoType === "TileRow" && content.Tiles?.length) {
        const rowElement = this.renderTileRow(content);
        columnElement.appendChild(rowElement);
      }

      if (contentEl) {
        columnElement.appendChild(contentEl);
      }
    });

    container.appendChild(columnElement);
  }
}
