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
document.addEventListener("DOMContentLoaded", function () {
	let spolufinancovanoEU =
		'<div class="financovan-eu"><div><img src="https://cdn.myshoptet.com/usr/www.verpet.cz/user/documents/upload/Financováno EU 1.png" caption="false" width="303" height="91" alt="Financováno EU"><img src="https://cdn.myshoptet.com/usr/www.verpet.cz/user/documents/upload/Financováno EU 2.png" caption="false" width="178" height="73" alt="Financováno EU"><img src="https://cdn.myshoptet.com/usr/www.verpet.cz/user/documents/upload/Financováno EU 3.png" caption="false" width="224" height="69" alt="Financováno EU" style="margin-left: 10px;"><p><span>Projekt 0461000736 byl financován Evropskou Unií.</span></p></div></div>';
	$(spolufinancovanoEU).insertAfter(".custom-footer__articles.col-sm-4");
});
