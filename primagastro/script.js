if (document.body.classList.contains("type-product")) {
	document.addEventListener("DOMContentLoaded", function () {
		let priceText = $("#product-detail .price[data-testid='productCardPrice']").text();
		let numericPrice = priceText.replace(/[^\d]/g, "");
		let priceInt = parseInt(numericPrice, 10);
		if (priceInt === 1) {
			contactFormProductDetail();
		}
	});
}

if (document.body.classList.contains("type-category") || document.body.classList.contains("type-search")) {
	document.addEventListener("DOMContentLoaded", function () {
		cebaNaDotazProductList();
		cenaNaDotazTopCategory();
	});
	document.addEventListener("ShoptetDOMPageContentLoaded", function () {
		cebaNaDotazProductList();
		cenaNaDotazTopCategory();
	});
}

document.addEventListener("ShoptetDOMSearchResultsLoaded", function () {
	cenaNaDorazSearch();
});

function contactFormProductDetail() {
	let cenaNaDotazHtml = `
		<div class="cena-na-dotaz">
			<span>
				Cena na dotaz
			</span>
			<div class="cena-na-dotaz-btn">
				<span>
					Poptat cenu
				</span>
			</div>
		</div>
	`;
	$("#product-detail").html(cenaNaDotazHtml);

	let productName = $("#product-detail-h1 h1").text();
	let productCode = $("#product-detail-info .variant-code").text();
	$(".cena-na-dotaz-btn").on("click touch", function () {
		$(".p-question").click();
	});
	setTimeout(function () {
		$("#content-modal textarea").val(
			"Dobrý den, zajímám se o cenu produktu: " + productName + " s kódem: " + productCode
		);
	}, 350);
}

function cebaNaDotazProductList() {
	$(".product").each(function () {
		let priceText = $(this).find(".p-det-main-price").text();
		let numericPrice = priceText.replace(/[^\d]/g, "");
		let priceInt = parseInt(numericPrice, 10);
		if (priceInt === 1) {
			$(this)
				.find(".product-card-static-source-js")
				.html('<div class="product-list-cena-na-dotaz"><span>Cena na dotaz</span></div>');
			$(this).find(".product-card-hover-content.shoptet-clearfix").remove();
			let productHref = $(this).find("a.p-name").attr("href");
			$(this)
				.find(".product-card-hover-content")
				.append(`<a href="${productHref}" class="zobrazit-detail">Detail produktu</a>`);
		}
	});
}

function cenaNaDotazTopCategory() {
	$("#category-top10 .columns").each(function () {
		let priceText = $(this).find(".p-cat-prices strong").first().text();
		let numericPrice = priceText.replace(/[^\d]/g, "");
		let priceInt = parseInt(numericPrice, 10);
		if (priceInt === 1) {
			$(this).find(".p-cat-prices").first().html("<strong>Cena na dotaz</strong>");
		}
	});
}

function cenaNaDorazSearch() {
	$(".search-whisperer li").each(function () {
		let priceText = $(this).find(".search-whisperer-price").text();
		let numericPrice = priceText.replace(/[^\d]/g, "");
		let priceInt = parseInt(numericPrice, 10);
		if (priceInt === 1) {
			$(this).find(".search-whisperer-price").html("Cena na dotaz");
		}
	});
}

/* function createContactForm() {
	let formHtml = `
		<div class="cena-na-dotaz-form">
			<div class="cena-na-dotaz-form-block">
				<form  action="/action/MailForm/SendEmail/" method="post" id="formContact">
					<fieldset>
						<input type="hidden" name="formId" value="1" />
						<div class="form-group js-validated-element-wrapper">
							<label for="fullName"><span class="required-asterisk">Jméno a příjmení</span></label>
							<input type="text" value="" name="fullName" id="fullName" class="form-control" required="" />
							<span class="no-display">Nevyplňujte toto pole:</span>
							<input type="text" name="surname" value="" class="no-display" />
						</div>
						<div class="form-group js-validated-element-wrapper">
							<label for="email"><span class="required-asterisk">E-mail</span></label>
							<input type="email" value="" name="email" id="email" class="form-control" required="" />
						</div>
						<div class="form-group js-validated-element-wrapper">
							<label for="message"><span class="required-asterisk">Zpráva</span></label>
							<textarea name="message" rows="7" class="form-control" required=""></textarea>
						</div>
						<div>Vložením zprávy souhlasíte s <a href="/ochrana-osobnich-udaju/">podmínkami ochrany osobních údajů</a></div>
						<div class="form-group submit-wrapper">
							<input type="submit" value="Odeslat" class="btn btn-primary" />
						</div>
					</fieldset>
				</form>
				<div class="cena-na-dotaz-close">
					<span>
						x
					</span>
				</div>
			</div>
		</div>
    `;
	$("body").append(formHtml);
} */

/* function contactFormProductDetailCustom() {
	let cenaNaDotazHtml = `
		<div class="cena-na-dotaz">
			<span>
				Cena na dotaz
			</span>
			<div class="cena-na-dotaz-btn">
				<span>
					Poptat cenu
				</span>
			</div>
		</div>
	`;
	$("#product-detail").html(cenaNaDotazHtml);
	$(".cena-na-dotaz-btn").on("click", function () {
		$(".cena-na-dotaz-form").addClass("show");
	});
	$(".cena-na-dotaz-close").on("click", function () {
		$(".cena-na-dotaz-form").removeClass("show");
	});
	$(document).keyup(function (e) {
		if (e.key === "Escape") {
			$(".cena-na-dotaz-form").removeClass("show");
		}
	});

	let productName = $("#product-detail-h1 h1").text();
	let productCode = $("#product-detail-info .variant-code").text();
	$("#formContact textarea").val("Dobrý den, zajímám se o cenu produktu: " + productName + " s kódem: " + productCode);
} */
