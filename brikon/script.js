if (!document.body.classList.contains("admin-logged")) {
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

	$(document).ready(function () {
		$("#productsAlternative").insertAfter(".p-detail-inner-header");
	});
}

if (document.body.classList.contains("admin-logged")) {
	if (document.body.classList.contains("type-detail")) {
		reworkProductVariants();
		hideEmptyDetailParameters();
	}

	function reworkProductVariants() {
		const container = document.querySelector("#productsAlternative .products");
		if (!container) return;

		const products = container.querySelectorAll(".product:not(.show-more-products-box)");
		if (products.length === 0) return;

		const currentImgEl = document.querySelector(".p-main-image img");
		const currentImgSrc = currentImgEl?.getAttribute("src") || "";
		const currentImgAlt = currentImgEl?.getAttribute("alt") || "";
		const currentName = document.querySelector(".p-detail-inner-header h1")?.textContent.trim() || "";
		const currentPrice = document.querySelector(".price-final-holder")?.textContent.trim() || "";
		const currentPriceNum = parseInt(currentPrice.replace(/\s/g, "").replace(/[^\d]/g, ""), 10);

		const variantsHTML = Array.from(products)
			.map((product) => {
				const imgEl = product.querySelector(".image img");
				const imgSrc = imgEl?.getAttribute("data-src") || imgEl?.getAttribute("src") || "";
				const imgAlt = imgEl?.getAttribute("alt") || "";

				const name = product.querySelector("[data-micro='name']")?.textContent.trim() || "";
				const href =
					product.querySelector("a.image")?.getAttribute("href") ||
					product.querySelector("a.name")?.getAttribute("href") ||
					"#";

				const availabilityEl = product.querySelector(".availability span");
				const availability = availabilityEl?.textContent.trim() || "";
				const availabilityColor = availabilityEl?.style.color || "";

				const priceRaw = product.querySelector(".price-final strong")?.textContent.trim() || "";
				const priceNum = parseInt(priceRaw.replace(/\s/g, "").replace(/[^\d]/g, ""), 10);
				const diff = priceNum - currentPriceNum;
				const priceDiff = isNaN(diff)
					? ""
					: diff > 0
						? `+${diff.toLocaleString("cs-CZ")},-`
						: diff < 0
							? `${diff.toLocaleString("cs-CZ")},-`
							: "+ 0,-";

				return `<a href="${href}" class="custom-variant">
				<div class="custom-variant-image">
					<img src="${imgSrc}" alt="${imgAlt}">
				</div>
				<div class="custom-variant-info">
					<h5>${name}</h5>
					<span class="custom-variant-availability" style="color:${availabilityColor}">${availability}</span>
					<span class="custom-variant-price">${priceDiff}</span>
				</div>
			</a>`;
			})
			.join("");

		const currentVariantHTML = `<div class="current-variant">
			<div class="custom-variant">
				<div class="custom-variant-image">
					<img src="${currentImgSrc}" alt="${currentImgAlt}">
				</div>
				<div class="custom-variant-info">
					<h5>${currentName}</h5>
					<span class="custom-variant-price">${currentPrice}</span>
				</div>
				<div id="variant-arrow"></div>
			</div>
		</div>`;

		const wrapper = document.createElement("div");
		wrapper.className = "custom-variants-wrapper";
		wrapper.innerHTML = `<h4>Další dostupné varianty:</h4>
			<div class="custom-variants">
				${currentVariantHTML}
				<div class="custom-other-variants">
					${variantsHTML}
				</div>
			</div>`;

		container.closest("#productsAlternative").replaceWith(wrapper);

		wrapper.querySelector(".current-variant").addEventListener("click", function () {
			wrapper.querySelector(".custom-variants").classList.toggle("active");
		});
	}

	function hideEmptyDetailParameters() {
		let parameters = document.querySelector(".product-top .detail-parameters");
		if (!parameters) {
			return;
		}
		let parametersLength = parameters.querySelectorAll(".parameter").length;
		if (parametersLength === 0) {
			parameters.classList.add("empty");
		}
	}
}
