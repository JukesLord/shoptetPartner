/* // if body has class admin-logged and in-index
if (document.body.classList.contains("admin-logged")) {
	if (document.body.classList.contains("in-index")) {
		wrapHomepageBlogs();
		function wrapHomepageBlogs() {
			// add class to body admin-logged-in-index
			let homepageBlogWrapper = document.querySelector(".homepage-blog-wrapper");
			if (!homepageBlogWrapper) {
				return;
			}
			let newsItems = homepageBlogWrapper.querySelectorAll(".news-item");
			if (!newsItems || newsItems.length === 0) {
				return;
			}
			const newsItemsWrapper = document.createElement("div");
			newsItemsWrapper.classList.add("news-items-wrapper");
			homepageBlogWrapper.appendChild(newsItemsWrapper);
			newsItems.forEach((newsItem) => {
				newsItemsWrapper.appendChild(newsItem);
			});
		}
	}
}
 */
/*
const clanek1 = "https://www.king-kratom.cz/blog/kratom-ostrava/";
const clanek2 = "https://www.king-kratom.cz/blog/co-je-to-kratom/";
const clanek3 = "https://www.king-kratom.cz/blog/kratom-a-antibiotika/";
*/

// if body has class admin-logged and in-index
if (document.body.classList.contains("admin-logged")) {
	if (document.body.classList.contains("in-index")) {
		renderClanky();
		async function renderClanky() {
			if (clanek1 && clanek2 && clanek3) {
				let clankyUrls = [clanek1, clanek2, clanek3];
				const clankyContainer = document.createElement("div");
				clankyContainer.classList.add("clanky-container");

				const clankyTitle = document.createElement("div");
				clankyTitle.classList.add("homepage-group-title", "h4");
				clankyTitle.textContent = "Nové články";
				clankyContainer.appendChild(clankyTitle);

				let clankyWrapper = document.createElement("div");
				clankyWrapper.classList.add("clanky-wrapper");
				clankyContainer.appendChild(clankyWrapper);
				let footer = document.querySelector("#footer");
				if (footer) {
					//insert it before footer
					/* footer.parentNode.insertBefore(clankyContainer, footer); */

					//prepend it to footer rows
					let footerRows = footer.querySelector(".footer-rows");
					if (footerRows) {
						footerRows.prepend(clankyContainer);
					}
				}
				for (let url of clankyUrls) {
					try {
						const response = await fetch(url);
						if (!response.ok) {
							throw new Error(`Couldnt fetch ${url}: ${response.statusText}`);
						}
						const html = await response.text();
						const parser = new DOMParser();
						const doc = parser.parseFromString(html, "text/html");

						const getMeta = (attr, value) => {
							const el = doc.querySelector(`meta[${attr}="${value}"]`);
							return el ? el.getAttribute("content") : "";
						};

						const ogUrl = getMeta("property", "og:url");
						const ogTitle = getMeta("property", "og:title");
						const ogImage = getMeta("property", "og:image");
						const ogDescription = getMeta("property", "og:description");

						// Extract relative path from og:url
						const urlObj = new URL(ogUrl);
						const relativePath = urlObj.pathname;

						// Convert image URL to CDN format
						const imgUrl = ogImage.replace(
							"https://www.king-kratom.cz/",
							"https://cdn.myshoptet.com/usr/www.king-kratom.cz/",
						);

						const newsItem = document.createElement("div");
						newsItem.classList.add("news-item-custom");
						newsItem.innerHTML = `
							<a href="${relativePath}" title="${ogTitle}">
								<div class="image">
									<img src="${imgUrl}" alt="${ogTitle}" width="1536" height="1024" data-src="${imgUrl}" fetchpriority="low" loading="lazy">
								</div>
								<div class="text">
									<span class="title">${ogTitle}</span>
									<div class="description">${ogDescription.trim()}</div>
									<span class="read-article">Číst článek</span>
								</div>
							</a>`;
						clankyWrapper.appendChild(newsItem);
					} catch (error) {
						console.error(`Error fetching ${url}:`, error);
					}
				}
			}
		}
	}
}
