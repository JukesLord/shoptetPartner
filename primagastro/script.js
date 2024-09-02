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
		cenaNaDotazProductList();
		cenaNaDotazTopCategory();
	});
	document.addEventListener("ShoptetDOMPageContentLoaded", function () {
		cenaNaDotazProductList();
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

	let textPoptavky;
	/*má varianty*/
	if ($("#product-variants").length > 0) {
		textPoptavky = "Dobrý den, zajímám se o cenu produktu: " + productName;
		$(".variant-submit").remove();
		$(".variant-availability").remove();
		$(".variant-price").html("<strong>Cena na dotaz</strong>");
	} else {
		/*nemá varianty*/
		textPoptavky = "Dobrý den, zajímám se o cenu produktu: " + productName + " s kódem: " + productCode;
	}
	$(".cena-na-dotaz-btn").on("click touch", function () {
		$(".p-question").click();
		$("body").addClass("poptavka-open");
		setTimeout(function () {
			$("#content-modal .tari:contains('Telefon')").addClass("required-asterisk");
			$("#content-modal input[name='phone']").attr("required", "");
			$("#content-modal input[name='email']").attr("required", "");
			// Add class "last" to the second last tr in #content-modal
			$("#content-modal tr:nth-last-child(2)").addClass("last");

			// Create the new rows
			let nameRow = `
				<tr>
					<td class="tari nowrap">
						<span class="required-asterisk">Jméno a příjmení</span>
					</td>
					<td>
						<input id="jmeno-prijmeni" type="text" name="name" value="" size="30" required="required">
					</td>
				</tr>`;

			let vatRow = `
				<tr>
					<td class="tari nowrap">
						<span class="required-asterisk">IČO:</span>
					</td>
					<td>
						<input id="ico" type="text" name="vat" value="" size="30" required="required">
					</td>
				</tr>`;

			let messageCopyRow = `
				<tr>
					<td class="tari nowrap">
						<span class="required-asterisk">Zpráva:</span>
					</td>
					<td>
						<textarea id="message-copy" name="message-copy" rows="7" cols="50" class="s-400 required="required""></textarea>
					</td>
				</tr>`;

			// Prepend the new rows to the tbody
			$("#content-modal tbody").prepend(nameRow);
			$("#content-modal tbody").prepend(vatRow);
			$(messageCopyRow).insertBefore($("#content-modal .last"));

			$("#content-modal textarea").val(textPoptavky);

			// Listener for changes in #jmeno-prijmeni, #ico, or #message-copy
			$("#content-modal").on("input", "#jmeno-prijmeni, #ico, #message-copy", function () {
				const name = $("#jmeno-prijmeni").val();
				const vat = $("#ico").val();
				const messageCopy = $("#message-copy").val();
				const mergedMessage = `Jméno a příjmení: ${name}\n\nIČO: ${vat}\n\n ${messageCopy}`;
				$("#content-modal .last textarea").val(mergedMessage);
			});
		}, 350);
	});
}

function cenaNaDotazProductList() {
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
