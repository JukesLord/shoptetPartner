document.addEventListener("DOMContentLoaded", function (event) {
	if (document.body.classList.contains("admin-logged")) {
		if (document.body.classList.contains("type-detail")) {
			/*alternative varianty podobné*/
			let productAlternativeWrapper = $(".products-alternative-wrapper");
			let productsAlternative = productAlternativeWrapper.find(".product");

			if (productsAlternative.length > 0) {
				productAlternativeWrapper.insertBefore(".p-detail-inner .social-buttons-wrapper");
				$("<span class='variants-text'>Další varianty:</span>").insertBefore(productAlternativeWrapper);

				productsAlternative.each(function (product) {
					//change every product > div to product > a with href product.find("a").attr("href")
					let $product = $(product);
					variantsBlock.append($product);
					let image = $product.find(".image img");
					let dataSrc = image.attr("data-src");
					image.attr("src", dataSrc);
				});
				$(".products-alternative-header").remove();
			}
			if (productsAlternative.length > 4) {
				$("<div id='show-more-variants'>Všechny varianty</div>").insertAfter(productAlternativeWrapper);

				$("#show-more-variants").click(function () {
					productAlternativeWrapper.toggleClass("show-all");
				});
			}
		}
	}
});
