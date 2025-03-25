import { TileComponent } from "../components/TileComponent";
import { Content } from "../interfaces/Content";
import { Page } from "../interfaces/Page";
import { PageContentStructure } from "../interfaces/PageContentStructure";
import { Row } from "../interfaces/Row";
import { Tile } from "../interfaces/Tile";

export class WebLinkPageMapper {
    tile: Tile;

    constructor(tile: Tile) {
        this.tile = tile;
    }

    
    renderContent(container: HTMLElement): void {
        if (!this.tile?.Action?.ObjectUrl) {
            const emptyContent = document.createElement('div');
            emptyContent.className = 'tbap-empty';
            emptyContent.innerText = 'No content available';
            container.appendChild(emptyContent);
            return;
        }

        const columnElement = document.createElement('div');
        columnElement.className = 'tbap-weblink-column';

        const contentEl = document.createElement("object") as HTMLObjectElement;
        contentEl.data = this.tile.Action.ObjectUrl;
        contentEl.type = 'text/html';
        contentEl.width = '100%';
        contentEl.height = '900px';

        contentEl.innerHTML = `
            <p>Unable to display content. 
                <a href="${this.tile.Action.ObjectUrl}" target="_blank">Open in new tab</a>
            </p>
        `;

        columnElement.appendChild(contentEl);
        
        container.appendChild(columnElement);
    }
}