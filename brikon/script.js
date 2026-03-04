if (document.body.classList.contains("type-detail")) {
	document.addEventListener("DOMContentLoaded", function (event) {
		/*alternative varianty podobné*/
		if ($("#productsAlternativec .product").length > 0) {
			$("#productsAlternativec .product").each(function () {
				let $this = $(this);
				let href = $this.find("a").first().attr("href");
				let classes = $this.attr("class");

				let newAnchor = $("<a>").attr("href", href).addClass(classes).html($this.html());
				$this.replaceWith(newAnchor);
			});
			if ($(".p-detail-inner .product-top .p-short-description").length > 0) {
				$("#productsAlternativec").insertAfter(".p-detail-inner .product-top .p-short-description");
			} else if ($(".p-detail-inner .product-top .add-to-cart").length > 0) {
				$("#productsAlternativec").insertAfter(".p-detail-inner .product-top .add-to-cart");
			} else {
				$("#productsAlternativec").insertAfter(".p-detail-inner .product-top .availability-value");
			}
			$("#productsAlternativec .p .image img").each(function () {
				let $this = $(this);
				let dataSrc = $this.attr("data-src");
				$this.attr("src", dataSrc);
			});
		}
		if ($("#productsAlternativec .product").length > 4) {
			$("#productsAlternativec").append('<div id="show-more-variants">Všechny varianty</div>');

			$("#show-more-variants").click(function () {
				$("#productsAlternativec").toggleClass("show-all");
			});
		}
	});
}
