if (document.body.classList.contains("admin-logged")) {
	addHrefToBlogHeader();
	function addHrefToBlogHeader() {
		if (!document.body.classList.contains("in-index")) {
			return;
		}
		let blogHeader = document.querySelector(".homepage-blog-wrapper .homepage-group-title");
		if (!blogHeader) {
			return;
		}
		let link = document.createElement("a");
		link.href = "/nase-novinky/";
		link.textContent = "Naše novinky";
		blogHeader.innerHTML = "";
		blogHeader.appendChild(link);
	}
}
