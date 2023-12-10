document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("type-detail")) {
		addButtons();
	}
	if (document.body.classList.contains("in-kosik")) {
		document.addEventListener("ShoptetDOMCartContentLoaded", function () {
			solaxKosikKrok1();
		});
		solaxKosikKrok1();
	}
	if (document.body.classList.contains("in-krok-1")) {
		document.addEventListener("ShoptetDOMCartContentLoaded", function () {
			solaxKosikKrok2();
		});
		solaxKosikKrok2();
	}
	if (document.body.classList.contains("in-krok-2")) {
		document.addEventListener("ShoptetDOMCartContentLoaded", function () {
			solaxKosikKrok2();
			KosikKrok3();
		});
		solaxKosikKrok2();
		KosikKrok3();
	}
});

const additionalButtons =
	"<div class='additional-buttons'><a href='/kontakty' class='cst-button konzultace'>Nezávazná konzultace</a><a href='https://www.penizenastrese.cz/garantujeme-nizsi-ceny' class='cst-button'>Chci lepší cenu</a></div>";

function addButtons() {
	$(additionalButtons).insertBefore(".buy-box .add-to-cart");
}

let containsSolax = false;
let cenaBezDotace = "";
let cenaBezDotaceCastka = "";
const cenaBezDotaceString = "Cena před dotací: ";
const invesicePoDotaciString = "Invsestice po dotaci: ";
function solaxKosikKrok1() {
	$(".p-name").each(function () {
		if ($(this).text().includes("Solax") || $(this).text().includes("solax") || $(this).text().includes("SOLAX")) {
			containsSolax = true;
			cenaBezDotace = $(this).closest("tr").find(".show-tooltip").attr("data-original-title").split("ceny")[1];
			cenaBezDotace = cenaBezDotace.replace(/\s/g, "");

			cenaBezDotaceCastka = parseInt(cenaBezDotace.split("Kč")[0].replace(/\s/g, ""));
			cenaBezDotaceCastka = (cenaBezDotaceCastka * $(this).closest("tr").find(".quantity input.amount").val())
				.toLocaleString("en-US")
				.replace(/,/g, " ");

			$(this).closest("tr").find(".p-price").text("");
			$(this)
				.closest("tr")
				.find(".p-price")
				.append("<p class='cenaBezDotaceString'>" + cenaBezDotaceString + "</p>");
			$(this)
				.closest("tr")
				.find(".p-price")
				.append("<p class='cenaBezDotace'>" + cenaBezDotaceCastka + " Kč" + "</p>");
			$(this).closest("tr").find(".p-total").addClass("verticalAlignTop");
			$("<p class='invesicePoDotaciString'>" + invesicePoDotaciString + "</p>").insertBefore(
				$(this).closest("tr").find(".price-final")
			);
		}
	});
	if (containsSolax) {
		$(".summary-wrapper .price-label.price-primary").text("Vaše investice po dotaci:");
	}
}

function solaxKosikKrok2() {
	$(".cart-item-name .main-link").each(function () {
		if ($(this).text().includes("Solax") || $(this).text().includes("solax") || $(this).text().includes("SOLAX")) {
			containsSolax = true;
		}
		if (containsSolax) {
			$(".order-summary-inner > h4").text("Rozpočtový list");
			$(".order-summary-item.helper > div > strong").text("Vaše investice po dotaci:");
			$(".price-wrapper .price-label.price-primary").text("Vaše investice po dotaci:");
		}
	});
}
function KosikKrok3() {
	$(".co-contact-information h4").text("Údaje kllienta");
	$("h4.header-billing").text("Trvalá adresa / Fakturační adresa");
	$("label[for='another-shipping']").text("Adresa doručení / instalace je odlišná");
	$(".co-shipping-address h4").text("Adresa doručení / instalace");
	$("#shipping-address").insertAfter($(".co-billing-address"));

	$(".co-box-additional #note").append(
		"<textarea name='remark-2' id='remark-2' class='form-control' placeholder='Vaše poznámka' rows='4' data-testid='remark-2'></textarea>"
	);

	$(".co-box-additional").prepend(
		'<div class="block-s-prodejcem"><div class="form-group"><input type="checkbox" name="nakupujiSProdejcem" id="nakupujiSProdejcem" value="0"><label for="nakupujiSProdejcem" class="whole-width">Nakupuji s prodejcem</label></div></div>'
	);
	$(".block-s-prodejcem .form-group").append(
		'<label for="prodejce-jmeno" class="">Jméno a příjmení prodejce</label><input type="text" name="prodejce-jmeno" id="prodejce-jmeno" class="form-control" placeholder=""</input>'
	);
	$(".block-s-prodejcem .form-group").append(
		'<label for="prodejce-id" class="">ID Prodejce</label><input type="text" name="prodejce-id" id="prodejce-id" class="form-control" placeholder="ID000000"</input>'
	);
	$(".block-s-prodejcem .form-group").append(
		'<label for="prodejce-email" class="">E-mail prodejce</label><input type="email" name="prodejce-email" id="prodejce-email" class="form-control" placeholder=""</input>'
	);
	$(".block-s-prodejcem .form-group").append(
		'<label for="prodejce-telefon" class="">Telefon prodejce</label><input type="tel" name="prodejce-telefon" id="prodejce-telefon" class="form-control" placeholder=""</input>'
	);

	$("#nakupujiSProdejcem").change(function () {
		if (this.checked) {
			this.parent().addClass("checked");
		} else {
			this.parent().removeClass("checked");
		}
	});

	$("#remark-2").bind("input propertychange", function () {
		$("#remark").val($("#remark-2").val());
	});
}
