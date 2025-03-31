(()=>{"use strict";class t{constructor(){this._appVersion=null,this._isInitialized=!1}static getInstance(){return t.instance||(t.instance=new t),t.instance}init(t){this._isInitialized?console.warn("AppConfig already initialized - ignoring new data"):(this._appVersion=t,this._isInitialized=!0,this.initialiseTheme())}initialiseTheme(){var t;document.body.style.fontFamily=(null===(t=this.theme)||void 0===t?void 0:t.ThemeFontFamily)||"Roboto"}get pages(){var t;return(null===(t=this._appVersion)||void 0===t?void 0:t.Pages)||null}get theme(){var t;return(null===(t=this._appVersion)||void 0===t?void 0:t.SDT_Theme)||null}get homePage(){var t;return(null===(t=this.pages)||void 0===t?void 0:t.find((t=>"Home"===t.PageName)))||null}getPage(t){var e;return(null===(e=this.pages)||void 0===e?void 0:e.find((e=>e.PageId===t)))||null}pageContentStructure(t){var e,n;return null===(n=null===(e=this.pages)||void 0===e?void 0:e.find((e=>e.PageId===t)))||void 0===n?void 0:n.PageContentStructure}pageMenuStructure(t){var e,n;return null===(n=null===(e=this.pages)||void 0===e?void 0:e.find((e=>e.PageId===t)))||void 0===n?void 0:n.PageMenuStructure}tileParentPage(t){var e;for(const n of this.pages||[])if(null===(e=n.PageMenuStructure)||void 0===e?void 0:e.Rows){let e=!1;for(const i of n.PageMenuStructure.Rows){if(i.Tiles)for(const n of i.Tiles)if(n.Id===t){e=!0;break}if(e)break}if(e)return n}return null}}t.instance=null;class e{constructor(){this.version=t.getInstance()}getTheme(){return this.version.theme}getThemeIcons(){var t;return null===(t=this.version.theme)||void 0===t?void 0:t.Icons}getThemeColors(){var t;return null===(t=this.version.theme)||void 0===t?void 0:t.Colors}getThemeCtaColors(){var t;return null===(t=this.version.theme)||void 0===t?void 0:t.CtaColors}getThemeColor(t){var e,n;return null===(n=null===(e=this.getThemeColors())||void 0===e?void 0:e.find((e=>e.ColorName===t)))||void 0===n?void 0:n.ColorCode}getThemeCtaColor(t){var e,n;return t||(t="CtaColorOne"),null===(n=null===(e=this.getThemeCtaColors())||void 0===e?void 0:e.find((e=>e.CtaColorName===t)))||void 0===n?void 0:n.CtaColorCode}getThemeIcon(t){var e,n;return null===(n=null===(e=this.getThemeIcons())||void 0===e?void 0:e.find((e=>e.IconName===t)))||void 0===n?void 0:n.IconSVG}}class n{constructor(){this.header=document.createElement("div"),this.init()}init(){this.header.classList.add("tbap-header");const t=document.createElement("span");t.id="clock",t.innerText="8:34 PM";const e=document.createElement("span");e.classList.add("icons");const n=document.createElement("i");n.classList.add("fas","fa-signal");const i=document.createElement("i");i.classList.add("fas","fa-wifi");const a=document.createElement("i");a.classList.add("fas","fa-battery"),e.appendChild(n),e.appendChild(i),e.appendChild(a),this.header.appendChild(t),this.header.appendChild(e)}render(t){t.appendChild(this.header)}}class i{constructor(t){this.tile=t}renderContent(t){document.createElement("div").className="tbap-weblink-column";const e=document.createElement("div");e.style.position="relative",e.style.width="100%",e.style.height="100vh",e.style.overflow="hidden";const n=document.createElement("div");n.id="map-preloader",n.style.position="absolute",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.zIndex="1000";const i=document.createElement("img");i.src="/Resources/UCGrapes1/src/images/spinner.gif",i.alt="Loading map...",i.style.width="32px",i.style.height="32px",n.appendChild(i),e.appendChild(n);const a=document.createElement("iframe");a.id="map-frame",a.style.width="100%",a.style.height="100%",a.style.border="none",a.style.visibility="hidden",a.allowFullscreen=!0,a.loading="lazy",e.appendChild(a),t.appendChild(e),setTimeout((()=>{navigator.geolocation.getCurrentPosition((t=>{const e=t.coords.latitude,n=t.coords.longitude;a.src=`https://www.google.com/maps/embed/v1/view?key=AIzaSyBBaQo7_sF2xk3uNIyKp_Z-4BbaTebGGa4&center=${e},${n}&zoom=18`}),(t=>{console.error("Geolocation error:",t),a.src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBBaQo7_sF2xk3uNIyKp_Z-4BbaTebGGa4&center=0,0&zoom=2"})),a.addEventListener("load",(()=>{n.style.display="none",a.style.visibility="visible"})),setTimeout((()=>{n.style.display="none",a.style.visibility="visible"}),7e3)}),500)}}class a{htmlData(){let t=`\n        <div class="tbap-date-selector">\n          <span class="tbap-arrow">❮</span>\n          <span class="tbap-date-text" id="current-date">${this.formatDate()}</span>\n          <span class="tbap-arrow">❯</span>\n        </div>\n        <div class="tbap-schedule" id="schedule-container">\n      `;for(let e=0;e<24;e++)t+=`\n            <div class="tbap-time-slot">\n              <div class="tbap-time">${e.toString().padStart(2,"0")+":00"}</div>\n              <div class="tbap-events"></div>\n              ${e===(new Date).getHours()?'\n                <div class="tbap-current-time-indicator"></div>\n                <div class="tbap-current-time-dot"></div>':""}\n            </div>\n          `;return t+="</div>",t}formatDate(){return(new Date).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}).replace(/(\d{2} \w{3}) (\d{4})/,"$1, $2")}renderContent(t){const e=document.createElement("div");for(e.innerHTML=this.htmlData();e.firstChild;)t.appendChild(e.firstChild)}}class s{constructor(t){this.cta=t,this.themeManager=new e,this.ctaButton=document.createElement("div"),this.createButton()}createButton(){"Round"==this.cta.CtaButtonType?this.createRoundButton():"FullWidth"==this.cta.CtaButtonType?this.createFullWidthButton():"Image"==this.cta.CtaButtonType?this.createImageButton():"Icon"==this.cta.CtaButtonType&&this.createIconButton()}createRoundButton(){this.ctaButton.classList.add("tbap-cta-round-button");const t=document.createElement("div");t.classList.add("tbap-cta-round-button__button"),t.style.backgroundColor=this.themeManager.getThemeCtaColor(this.cta.CtaBGColor),t.innerHTML=this.getIcon();const e=document.createElement("div");e.classList.add("tbap-cta-round-button__label"),e.innerText=this.cta.CtaLabel,this.ctaButton.appendChild(t),this.ctaButton.appendChild(e)}createFullWidthButton(){this.ctaButton.classList.add("tbap-cta-plain-button");const t=document.createElement("div");t.classList.add("tbap-cta-plain-button__button"),t.style.backgroundColor=this.themeManager.getThemeCtaColor(this.cta.CtaBGColor);const e=document.createElement("div");e.classList.add("tbap-cta-plain-button__label"),e.innerText=this.cta.CtaLabel,t.appendChild(e),this.ctaButton.appendChild(t)}createIconButton(){this.ctaButton.classList.add("tbap-cta-icon-button");const t=document.createElement("div");t.classList.add("tbap-cta-icon-button__button"),t.style.backgroundColor=this.themeManager.getThemeCtaColor(this.cta.CtaBGColor);const e=document.createElement("span");e.classList.add("tbap-cta-iconSvg-button__iconSvg"),e.innerHTML=this.getIcon();const n=document.createElement("div");n.classList.add("tbap-cta-icon-button__label"),n.innerText=this.cta.CtaLabel;const i=document.createElement("i");i.className="fa fa-angle-right tbap-cta-icon-button__icon",t.appendChild(e),t.appendChild(n),t.appendChild(i),this.ctaButton.appendChild(t)}createImageButton(){this.ctaButton.classList.add("tbap-cta-img-button");const t=document.createElement("div");t.classList.add("tbap-cta-img-button__button"),t.style.backgroundColor=this.themeManager.getThemeCtaColor(this.cta.CtaBGColor);const e=document.createElement("img");e.classList.add("tbap-cta-img-button__img"),e.src=this.cta.CtaButtonImgUrl;const n=document.createElement("div");n.classList.add("tbap-cta-img-button__label"),n.innerText=this.cta.CtaLabel;const i=document.createElement("i");i.className="fa fa-angle-right tbap-cta-img-button__icon",t.appendChild(e),t.appendChild(n),t.appendChild(i),this.ctaButton.appendChild(t)}getIcon(){switch(this.cta.CtaType){case"Phone":return'\n                <svg id="ixdtl" data-gjs-type="svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32"\n                    viewBox="0 0 49.417 49.418">\n                    <path id="call" data-gjs-type="svg-in"\n                        d="M29.782,3a2.149,2.149,0,1,0,0,4.3A19.3,19.3,0,0,1,49.119,26.634a2.149,2.149,0,1,0,4.3,0A23.667,23.667,0,0,0,29.782,3ZM12.032,7.305a2.548,2.548,0,0,0-.818.067,8.342,8.342,0,0,0-3.9,2.342C2.775,14.254.366,21.907,17.437,38.98S42.16,53.643,46.7,49.1a8.348,8.348,0,0,0,2.346-3.907,2.524,2.524,0,0,0-1.179-2.786c-2.424-1.418-7.654-4.484-10.08-5.9a2.523,2.523,0,0,0-2.568.012l-4.012,2.392a2.517,2.517,0,0,1-2.845-.168,65.811,65.811,0,0,1-5.711-4.981,65.07,65.07,0,0,1-4.981-5.711A2.512,2.512,0,0,1,17.5,25.2L19.9,21.191a2.533,2.533,0,0,0,.008-2.577L14.012,8.556A2.543,2.543,0,0,0,12.032,7.305Zm17.751,4.289a2.149,2.149,0,1,0,0,4.3A10.709,10.709,0,0,1,40.525,26.634a2.149,2.149,0,1,0,4.3,0A15.072,15.072,0,0,0,29.782,11.594Zm0,8.594a2.149,2.149,0,1,0,0,4.3,2.114,2.114,0,0,1,2.149,2.148,2.149,2.149,0,1,0,4.3,0A6.479,6.479,0,0,0,29.782,20.188Z"\n                        transform="translate(-4 -3)" fill="#fff"></path>\n                </svg>\n                ';case"Email":return'\n                <svg id="inavf" data-gjs-type="svg" xmlns="http://www.w3.org/2000/svg" width="32"\n                    height="28" viewBox="0 0 41 32.8">\n                    <path id="Path_1218" data-gjs-type="svg-in" data-name="Path 1218"\n                        d="M6.1,4A4.068,4.068,0,0,0,2.789,5.7a1.5,1.5,0,0,0,.444,2.126l18,11.219a2.387,2.387,0,0,0,2.531,0L41.691,7.732a1.5,1.5,0,0,0,.384-2.2A4.063,4.063,0,0,0,38.9,4Zm35.907,8.376a.963.963,0,0,0-.508.152L23.765,23.711a2.392,2.392,0,0,1-2.531,0L3.5,12.656a.98.98,0,0,0-1.5.833V32.7a4.1,4.1,0,0,0,4.1,4.1H38.9A4.1,4.1,0,0,0,43,32.7V13.357A.981.981,0,0,0,42.007,12.376Z"\n                        transform="translate(-2 -4)" fill="#fff"></path>\n                </svg>\n                ';case"SiteUrl":return'\n                <svg id="i8bct" data-gjs-type="svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">\n                    <path id="Path_1213" data-gjs-type="svg-in" data-name="Path 1213" d="M15.833,4a4.163,4.163,0,0,0-2.958,1.229l-.979.979a4.168,4.168,0,0,0-1.229,2.958,4.1,4.1,0,0,0,.292,1.521L12.042,9.6a2.857,2.857,0,0,1,.792-2.458l.979-.979a2.853,2.853,0,0,1,2.021-.833,2.805,2.805,0,0,1,2,.833,2.85,2.85,0,0,1,0,4.021l-.979.979A2.853,2.853,0,0,1,14.833,12a2.439,2.439,0,0,1-.437-.042l-1.083,1.083a4.1,4.1,0,0,0,1.521.292A4.163,4.163,0,0,0,17.792,12.1l.979-.979A4.168,4.168,0,0,0,20,8.167,4.2,4.2,0,0,0,15.833,4ZM14.188,8.854,8.854,14.188l.958.958,5.333-5.333ZM9.167,10.667A4.163,4.163,0,0,0,6.208,11.9l-.979.979A4.168,4.168,0,0,0,4,15.833,4.2,4.2,0,0,0,8.167,20a4.163,4.163,0,0,0,2.958-1.229l.979-.979a4.168,4.168,0,0,0,1.229-2.958,4.1,4.1,0,0,0-.292-1.521L11.958,14.4a2.857,2.857,0,0,1-.792,2.458l-.979.979a2.853,2.853,0,0,1-2.021.833,2.805,2.805,0,0,1-2-.833,2.85,2.85,0,0,1,0-4.021l.979-.979A2.853,2.853,0,0,1,9.167,12a2.44,2.44,0,0,1,.438.042l1.083-1.083A4.1,4.1,0,0,0,9.167,10.667Z" transform="translate(-4 -4)" fill="#fff">\n                    </path>\n                </svg>\n                ';case"Form":return'\n                <svg id="igqdh" data-gjs-type="svg" xmlns="http://www.w3.org/2000/svg" width="26" height="30"\n                    viewBox="0 0 13 16">\n                    <path id="Path_1209" data-gjs-type="svg-in" data-name="Path 1209"\n                        d="M9.828,4A1.823,1.823,0,0,0,8,5.8V18.2A1.823,1.823,0,0,0,9.828,20h9.344A1.823,1.823,0,0,0,21,18.2V9.8a.6.6,0,0,0-.179-.424l-.006-.006L15.54,4.176A.614.614,0,0,0,15.109,4Zm0,1.2H14.5V8.6a1.823,1.823,0,0,0,1.828,1.8h3.453v7.8a.6.6,0,0,1-.609.6H9.828a.6.6,0,0,1-.609-.6V5.8A.6.6,0,0,1,9.828,5.2Zm5.891.848L18.92,9.2H16.328a.6.6,0,0,1-.609-.6Z"\n                        transform="translate(-8 -4)" fill="#fff"></path>\n                </svg>\n                '}return""}getCta(){return this.ctaButton}}class o{constructor(t){this.pageId=t.PageId,this.pageData=t.PageContentStructure}renderImage(t){const e=document.createElement("div");e.classList.add("tbap-image-container");const n=document.createElement("img");return n.src=null==t?void 0:t.ContentValue,e.appendChild(n),e}renderDescription(t){const e=document.createElement("div");return e.classList.add("tbap-description-container"),e.innerHTML=null==t?void 0:t.ContentValue,e}renderContent(t){var e,n;if(!(null===(n=null===(e=this.pageData)||void 0===e?void 0:e.Content)||void 0===n?void 0:n.length)){const e=document.createElement("div");return e.className="tbap-empty",e.innerText="No content available",void t.appendChild(e)}const i=document.createElement("div");i.className="tbap-content-column",this.pageData.Content.forEach((t=>{let e=null;"Image"===t.ContentType&&t.ContentValue?e=this.renderImage(t):"Description"===t.ContentType&&t.ContentValue&&(e=this.renderDescription(t)),e&&i.appendChild(e)}));const a=document.createElement("div");a.className="tbap-cta-container",this.pageData.Cta.forEach((t=>{console.log(t);const e=new s(t);a.appendChild(e.getCta())})),i.appendChild(a),t.appendChild(i)}}class l{constructor(t){this.pageId=t.PageId,this.pageData=t.PageMenuStructure}renderRow(t,e){const n=1===t.Tiles.length,i=e&&n,a=document.createElement("div");a.className="tbap-row",a.id=t.Id;const s=t.Tiles.length;return t.Tiles.forEach(((t,e)=>{const n=new y(t,i&&0===e,this.pageId,s);a.appendChild(n.getElement())})),a}renderContent(t){var e,n;if(!(null===(n=null===(e=this.pageData)||void 0===e?void 0:e.Rows)||void 0===n?void 0:n.length)){const e=document.createElement("div");return e.className="tbap-empty",e.innerText="No content available",void t.appendChild(e)}const i=document.createElement("div");i.className="tbap-column",this.pageData.Rows.forEach(((t,e)=>{const n=0===e,a=this.renderRow(t,n);i.appendChild(a)})),t.appendChild(i)}}class r{renderContent(t){const e=document.createElement("div");e.className="tbap-chat-container";const n=document.createElement("div");n.className="tbap-toggle-buttons";const i=document.createElement("button");i.style.backgroundColor="#5068a8",i.style.borderRadius="6px",i.innerText="Messages";const a=document.createElement("button");a.style.backgroundColor="#e1e1e1",a.style.borderRadius="6px",a.style.color="#262626",a.innerText="Requests",n.appendChild(i),n.appendChild(a);const s=document.createElement("div");s.className="tbap-chat-body",s.innerText="No messages yet",e.appendChild(n),e.appendChild(s),t.appendChild(e)}}class d{constructor(t){this.page=t,this.pageElement=document.createElement("div"),this.init()}init(){this.pageElement.classList.add("tbap-page-container");const t=new n,e=new p(this.page);let i;t.render(this.pageElement),e.render(this.pageElement),"Calendar"===this.page.PageType?i=new a:"MyActivity"===this.page.PageType?i=new r:"Menu"===this.page.PageType||"MyCare"===this.page.PageType||"MyLiving"===this.page.PageType||"MyService"===this.page.PageType?i=new l(this.page):"Content"!==this.page.PageType&&"Location"!==this.page.PageType&&"Reception"!==this.page.PageType||(i=new o(this.page)),null==i||i.renderContent(this.pageElement)}render(){document.getElementById("frame").appendChild(this.pageElement)}}class c{constructor(e){this.version=t.getInstance(),this.pageId=e}init(){this.renderUI()}renderUI(){var t;if(this.pageId){const e=null===(t=this.version.pages)||void 0===t?void 0:t.find((t=>t.PageId===this.pageId)),n=document.querySelector(".tbap-page-container");n&&n.remove(),new d(e).render()}}}class h{constructor(e){this.version=t.getInstance(),this.pageId=e}back(){var t;if(this.pageId){const e=null===(t=this.version.pages)||void 0===t?void 0:t.find((t=>t.PageId===this.pageId));e&&("Home"===e.PageName?(new E).init():new c(e.PageId).init())}}}class p{constructor(t,e){this.page=t,this.pageTitle=e,this.appBar=document.createElement("div"),this.init()}init(){this.appBar.classList.add("tbap-app-bar");const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("viewBox","0 0 47 47"),t.setAttribute("width","47"),t.setAttribute("height","47"),t.classList.add("content-back-button"),t.innerHTML='\n            <g id="Ellipse_6" data-name="Ellipse 6" fill="none" stroke="#262626" stroke-width="1">\n                <circle cx="23.5" cy="23.5" r="23.5" stroke="none"></circle>\n                <circle cx="23.5" cy="23.5" r="23" fill="none"></circle>\n            </g>\n            <path id="Icon_ionic-ios-arrow-round-up" data-name="Icon ionic-ios-arrow-round-up" d="M13.242,7.334a.919.919,0,0,1-1.294.007L7.667,3.073V19.336a.914.914,0,0,1-1.828,0V3.073L1.557,7.348A.925.925,0,0,1,.263,7.341.91.91,0,0,1,.27,6.054L6.106.26h0A1.026,1.026,0,0,1,6.394.07.872.872,0,0,1,6.746,0a.916.916,0,0,1,.64.26l5.836,5.794A.9.9,0,0,1,13.242,7.334Z" transform="translate(13 30.501) rotate(-90)" fill="#262626"></path>\n        ',t.addEventListener("click",(t=>{t.preventDefault(),this.onBackButtonClicked()})),console.log("backButtonSvg",this.pageTitle);const e=document.createElement("h1");e.classList.add("title"),e.innerText=this.truncateText(this.pageTitle||this.page.PageName),this.appBar.appendChild(t),this.appBar.appendChild(e)}render(t){t.appendChild(this.appBar)}onBackButtonClicked(){const t=this.getParentId();t&&new h(t).back()}getParentId(){var t;try{let e=JSON.parse(localStorage.getItem("navigation")||'{"history":[]}');if(e.history.length<=0)return;const n=null===(t=e.history.find((t=>t.targetId===this.page.PageId)))||void 0===t?void 0:t.pageId;if(e.history.pop(),localStorage.setItem("navigation",JSON.stringify(e)),n)return n.trim().replace(/^["']|["']$/g,"")}catch(t){console.error("Error navigating back:",t)}return null}truncateText(t,e=20){return t.length>e?t.substring(0,e)+"...":t}}class g{constructor(t,e){this.page=e,this.tile=t,this.pageElement=document.createElement("div"),this.init()}init(){this.pageElement.classList.add("tbap-page-container");const t=new n,e=new p(this.page,this.tile.Name);let a;t.render(this.pageElement),e.render(this.pageElement),a=new i(this.tile),null==a||a.renderContent(this.pageElement)}render(){document.getElementById("frame").appendChild(this.pageElement)}}class u{constructor(e,n){this.version=t.getInstance(),this.tile=e,this.pageId=n}init(){this.renderUI()}renderUI(){var t;if(this.tile&&this.pageId){const e=null===(t=this.version.pages)||void 0===t?void 0:t.find((t=>t.PageId===this.pageId)),n=document.querySelector(".tbap-page-container");n&&n.remove(),new g(this.tile,e).render()}}}class m{constructor(t){this.tile=t}renderContent(t){var e,n;if(!(null===(n=null===(e=this.tile)||void 0===e?void 0:e.Action)||void 0===n?void 0:n.ObjectUrl)){const e=document.createElement("div");return e.className="tbap-empty",e.innerText="No content available",void t.appendChild(e)}const i=document.createElement("div");i.className="tbap-weblink-column";const a=document.createElement("div");a.id="weblink-preloader",a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.width="100%",a.style.height="100%",a.style.display="flex",a.style.justifyContent="center",a.style.alignItems="center",a.style.zIndex="1000";const s=document.createElement("img");s.src="/Resources/UCGrapes1/src/images/spinner.gif",s.alt="Loading content...",s.style.width="32px",s.style.height="32px",a.appendChild(s),i.appendChild(a);const o=document.createElement("object");o.data=this.tile.Action.ObjectUrl,o.type="text/html",o.width="100%",o.height="900px",o.style.visibility="hidden",o.innerHTML=`\n            <p>Unable to display content. \n                <a href="${this.tile.Action.ObjectUrl}" target="_blank">Open in new tab</a>\n            </p>\n        `,i.appendChild(o),t.appendChild(i),o.addEventListener("load",(()=>{a.style.display="none",o.style.visibility="visible"})),setTimeout((()=>{a.style.display="none",o.style.visibility="visible"}),5e3)}}class v{constructor(t,e){this.page=e,this.tile=t,this.pageElement=document.createElement("div"),this.init()}init(){this.pageElement.classList.add("tbap-page-container");const t=new n,e=new p(this.page,this.tile.Name);let i;t.render(this.pageElement),e.render(this.pageElement),i=new m(this.tile),null==i||i.renderContent(this.pageElement)}render(){document.getElementById("frame").appendChild(this.pageElement)}}class C{constructor(e,n){this.version=t.getInstance(),this.tile=e,this.pageId=n}init(){this.renderUI()}renderUI(){var t;if(this.tile&&this.pageId){const e=null===(t=this.version.pages)||void 0===t?void 0:t.find((t=>t.PageId===this.pageId)),n=document.querySelector(".tbap-page-container");n&&n.remove(),new v(this.tile,e).render()}}}class b{constructor(e){this.version=t.getInstance(),this.tile=e}navigate(){this.tile.Action.ObjectId&&("Web Link"===this.tile.Action.ObjectType?new C(this.tile,this.tile.Action.ObjectId).init():"Map"===this.tile.Action.ObjectType?new u(this.tile,this.tile.Action.ObjectId).init():new c(this.tile.Action.ObjectId).init())}}class y{constructor(t,n=!1,i,a){this.tile=t,this.pageId=i,this.isHighPriority=n,this.rowTileLength=a,this.themeManager=new e,this.tileContainer=document.createElement("div"),this.init()}init(){this.tileContainer.classList.add("tbap-tile"),this.isHighPriority&&this.tileContainer.classList.add("high-priority-tile");const t="left"===this.tile.Align?"start":"center";this.tileContainer.style.justifyContent=t,this.tileContainer.style.alignItems=t,this.tile.BGImageUrl?(this.tileContainer.style.backgroundImage=`url(${this.tile.BGImageUrl})`,this.tileContainer.style.backgroundColor=`rgba(0,0,0, ${this.tile.Opacity/100})`,this.tileContainer.style.backgroundBlendMode="overlay",this.tileContainer.style.backgroundPosition="center",this.tileContainer.style.backgroundSize="cover"):this.tile.BGColor&&(this.tileContainer.style.backgroundColor=this.themeManager.getThemeColor(this.tile.BGColor));const e=document.createElement("div");if(e.classList.add("tile-icon"),e.style.color=this.tile.Color,this.tile.Icon){e.innerHTML=this.themeManager.getThemeIcon(this.tile.Icon);const t=e.querySelector("path");t&&t.setAttribute("fill",this.tile.Color)}const n=document.createElement("div");n.classList.add("tile-title"),n.style.color=this.tile.Color,n.style.textAlign=this.tile.Align,this.tile.Text&&(n.innerHTML=this.wrapTileTitle(this.tile.Text)),this.isHighPriority&&(n.style.textTransform="uppercase"),this.tileContainer.appendChild(e),this.tileContainer.appendChild(n),this.tileContainer.addEventListener("click",(t=>{if(t.preventDefault(),this.tile.Action.ObjectId){const t=new b(this.tile);this.updateNavigationChain(),t.navigate()}}))}wrapTileTitle(t){if(3===this.rowTileLength){const e=t.split(" ");return e.length>1?e[0]+"<br>"+e[1]:t.replace("<br>","")}return t}updateNavigationChain(){try{const t=JSON.parse(localStorage.getItem("navigation")||'{"history":[]}');if(!(this.tile&&this.tile.Id&&this.tile.Action&&this.tile.Action.ObjectId))return void console.error("Tile or required properties are missing");const e=t.history.length;t.history.push({pageId:this.pageId,tileId:this.tile.Id,targetId:this.tile.Action.ObjectId,level:e}),localStorage.setItem("navigation",JSON.stringify(t))}catch(t){console.error("Error updating navigation chain:",t)}}getElement(){return this.tileContainer}}class w{constructor(t){this.pageId=t.PageId,this.pageData=t.PageMenuStructure}renderRow(t,e){const n=1===t.Tiles.length,i=e&&n,a=document.createElement("div");a.className="tbap-row",a.id=t.Id;const s=t.Tiles.length;return t.Tiles.forEach(((t,e)=>{const n=new y(t,i&&0===e,this.pageId,s);a.appendChild(n.getElement())})),a}renderContent(t){var e,n;if(!(null===(n=null===(e=this.pageData)||void 0===e?void 0:e.Rows)||void 0===n?void 0:n.length)){const e=document.createElement("div");return e.className="tbap-empty",e.innerText="No content available",void t.appendChild(e)}const i=document.createElement("div");i.className="tbap-column",this.pageData.Rows.forEach(((t,e)=>{const n=0===e,a=this.renderRow(t,n);i.appendChild(a)})),t.appendChild(i)}}class f{constructor(){this.appBar=document.createElement("div"),this.init()}init(){this.appBar.classList.add("tbap-home-app-bar");const t=document.createElement("div");t.classList.add("logo-section");const e=document.createElement("img");e.src="/Resources/AppPreview/public/logo.png",e.style.height="35px",t.appendChild(e);const n=document.createElement("div");n.classList.add("profile-section"),n.style.display="flex";const i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("viewBox","0 0 19.422 21.363"),i.setAttribute("width","16"),i.setAttribute("height","18"),i.setAttribute("fill","none"),i.innerHTML='\n            <path id="Path_1327" data-name="Path 1327" d="M15.711,5a6.8,6.8,0,0,0-3.793,12.442A9.739,9.739,0,0,0,6,26.364H7.942a7.769,7.769,0,1,1,15.537,0h1.942A9.739,9.739,0,0,0,19.5,17.442,6.8,6.8,0,0,0,15.711,5Zm0,1.942A4.855,4.855,0,1,1,10.855,11.8,4.841,4.841,0,0,1,15.711,6.942Z" transform="translate(-6 -5)" fill="#fff"></path>\n        ',n.appendChild(i),this.appBar.appendChild(t),this.appBar.appendChild(n)}render(t){t.appendChild(this.appBar)}}class I{constructor(t){this.page=t,this.homeElement=document.createElement("div"),this.init()}init(){this.homeElement.classList.add("tbap-page-container");const t=new n,e=new f;t.render(this.homeElement),e.render(this.homeElement),new w(this.page).renderContent(this.homeElement)}render(){document.getElementById("frame").appendChild(this.homeElement)}}class E{constructor(){this.version=t.getInstance()}init(){this.renderUI()}renderUI(){if(this.version.homePage){const t=this.version.homePage,e=document.querySelector(".tbap-page-container");e&&e.remove(),new I(t).render(),this.initialiseNavigator(t)}}initialiseNavigator(t){const e={history:[{pageId:t.PageId,targetId:"",tileId:"",level:0}]};localStorage.setItem("navigation",JSON.stringify(e))}}class T{constructor(){this.init()}init(){(new E).init()}}window.PreviewApp=class{constructor(e){t.getInstance().init(e),this.init()}init(){new T}}})();