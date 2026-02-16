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
