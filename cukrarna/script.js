/*-----------------------------------------------------------Kategorie orig images*/
if (document.body.classList.contains("type-category")) {
	document.querySelectorAll(".subcategories img").forEach((img) => {
		let src = img.getAttribute("src");
		if (src.includes("/thumb/")) {
			img.setAttribute("src", src.replace("/thumb/", "/orig/"));
		}
	});

	if (!document.body.classList.contains("in-nase-produkty")) {
		$(".category-top .category-perex").append($(".category-title"));
	}
}
