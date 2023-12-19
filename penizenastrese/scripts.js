document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("type-detail")) {
		addButtons();
	}
	if (document.body.classList.contains("in-kosik")) {
		document.addEventListener("ShoptetDOMCartContentLoaded", function () {
			solaxKosikKrok1();
			individualBalicek();
		});
		solaxKosikKrok1();
		individualBalicek();
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
	if (document.body.classList.contains("in-dekujeme")) {
		inDekujeme();
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
const invesicePoDotaciString = "Investice po dotaci: ";
function solaxKosikKrok1() {
	$(".p-name").each(function () {
		if (
			$(this).text().includes("elektrárna Solax") ||
			$(this).text().includes("elektrárna solax") ||
			$(this).text().includes("elektrárna SOLAX")
		) {
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
let individualBalicekHidden = false;
function individualBalicek() {
	$(".p-name").each(function () {
		if (
			$(this).text().includes("Postav si svou fotovoltaiku") ||
			$(this).text().includes("Postav si sám svou fotovoltaiku") ||
			$(this).text().includes("postav si sám svou fotovoltaiku") ||
			$(this).text().includes("postav si svou fotovoltaiku")
		) {
			individualBalicekHidden = true;
		}
	});
	if (!individualBalicekHidden) {
		$("#cart-wrapper").addClass("individualHidden");
	}
}

function solaxKosikKrok2() {
	$(".cart-item-name .main-link").each(function () {
		if (
			$(this).text().includes("elektrárna Solax") ||
			$(this).text().includes("elektrárna solax") ||
			$(this).text().includes("elektrárna SOLAX")
		) {
			containsSolax = true;
		}
		if (containsSolax) {
			$(".order-summary-inner > h4").text("Rozpočtový list");
			$(".order-summary-item.helper > div > strong").text("Vaše investice po dotaci:");
			$(".price-wrapper .price-label.price-primary").text("Vaše investice po dotaci:");
		}
	});
}
let checkedPoradce = false;
let jmenoPoradce = "";
let IDPoradce = "";
let emailPoradce = "";
let telefonPoradce = "";
let poznamkaZakaznika = "";

function KosikKrok3() {
	$(".co-contact-information h4").text("Údaje klienta");
	$("h4.header-billing").text("Trvalá adresa / Fakturační adresa");
	$("label[for='another-shipping']").text("Adresa doručení / Místo instalace");
	$(".co-shipping-address h4").text("Adresa doručení / Místo instalace");
	$("#shipping-address").insertAfter($(".co-billing-address"));
	$("#add-note").parent().addClass("add-note-form-group");

	$(".co-box-additional").prepend(
		'<div class="form-group note-2-form-group"><input type="checkbox" name="note-2" id="note-2" value="0"><label for="note-2" class="whole-width">Zadat poznámku pro obchodníka</label></div></div>'
	);

	$(".co-box-additional .note-2-form-group").append(
		"<textarea name='remark-2' id='remark-2' class='form-control' placeholder='Vaše poznámka' rows='4' data-testid='remark-2'></textarea>"
	);

	$(".co-box-additional").prepend(
		'<div class="block-s-poradcem"><div class="form-group"><input type="checkbox" name="nakupujiSPoradcem" id="nakupujiSPoradcem" value="0"><label for="nakupujiSPoradcem" class="whole-width">Váš poradce PENÍZE NA STŘEŠE</label></div></div>'
	);
	$(".block-s-poradcem .form-group").append(
		'<label for="poradce-jmeno" class="">Jméno a příjmení poradce</label><input type="text" name="poradce-jmeno" id="poradce-jmeno" class="form-control" placeholder=""</input>'
	);
	$(".block-s-poradcem .form-group").append(
		'<label for="poradce-id" class="">ID poradce</label><input type="text" name="poradce-id" id="poradce-id" class="form-control" placeholder="RRMMDD (Otočené datum narození Poradce)"</input>'
	);
	$(".block-s-poradcem .form-group").append(
		'<label for="poradce-email" class="">E-mail poradce</label><input type="email" name="poradce-email" id="poradce-email" class="form-control" placeholder=""</input>'
	);
	$(".block-s-poradcem .form-group").append(
		'<label for="poradce-telefon" class="">Telefon poradce</label><input type="tel" name="poradce-telefon" id="poradce-telefon" class="form-control" placeholder=""</input>'
	);

	$("#nakupujiSPoradcem").change(function () {
		if (this.checked) {
			$(this).parent().addClass("checked");
			$("#add-note").prop("checked", true);
			$("#note").addClass("visible");
			checkedPoradce = true;
		} else {
			$(this).parent().removeClass("checked");
			checkedPoradce = false;
		}
	});

	$("#note-2").change(function () {
		if (this.checked) {
			$(this).parent().addClass("checked");
			$("#add-note").prop("checked", true);
			$("#note").addClass("visible");
		} else {
			$(this).parent().removeClass("checked");
			if (!checkedPoradce) {
				$("#add-note").prop("checked", false);
				$("#note").removeClass("visible");
			}
		}
	});

	$("#poradce-jmeno").bind("input propertychange", function () {
		jmenoPoradce = $("#poradce-jmeno").val();
		$("#remark").val(
			jmenoPoradce + "\n" + IDPoradce + "\n" + emailPoradce + "\n" + telefonPoradce + "\n" + "\n" + poznamkaZakaznika
		);
	});
	$("#poradce-id").bind("input propertychange", function () {
		IDPoradce = $("#poradce-id").val();
		$("#remark").val(
			jmenoPoradce + "\n" + IDPoradce + "\n" + emailPoradce + "\n" + telefonPoradce + "\n" + "\n" + poznamkaZakaznika
		);
	});
	$("#poradce-email").bind("input propertychange", function () {
		emailPoradce = $("#poradce-email").val();
		$("#remark").val(
			jmenoPoradce + "\n" + IDPoradce + "\n" + emailPoradce + "\n" + telefonPoradce + "\n" + "\n" + poznamkaZakaznika
		);
	});
	$("#poradce-telefon").bind("input propertychange", function () {
		telefonPoradce = $("#poradce-telefon").val();
		$("#remark").val(
			jmenoPoradce + "\n" + IDPoradce + "\n" + emailPoradce + "\n" + telefonPoradce + "\n" + "\n" + poznamkaZakaznika
		);
	});
	$("#remark-2").bind("input propertychange", function () {
		poznamkaZakaznika = $("#remark-2").val();
		if (checkedPoradce) {
			$("#remark").val(
				jmenoPoradce + "\n" + IDPoradce + "\n" + emailPoradce + "\n" + telefonPoradce + "\n" + "\n" + poznamkaZakaznika
			);
		} else {
			$("#remark").val(poznamkaZakaznika);
		}
	});
}

function inDekujeme() {
	$("h1.order-summary-heading").text("Závazná objednávka byla odeslána");
}
