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
			cenaBezDotaceCastka = cenaBezDotace.split("Kč")[0] * $(this).closest("tr").find(".quantity input.amount").val();

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
}
