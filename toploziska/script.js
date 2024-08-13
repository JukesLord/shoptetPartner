if (document.body.classList.contains("type-detail")) {
	document.addEventListener("DOMContentLoaded", function () {
		let isCustomerRegistered = false;
		if (dataLayer[0].shoptet.customer) {
			isCustomerRegistered = dataLayer[0].shoptet.customer.registered;
		}
		if (isCustomerRegistered) {
			editVelkoobchodniCena();
		}
	});
}

function editVelkoobchodniCena() {
	let usetriteCZ = "Ušetříte";
	let velkoobchodniCenaCZ = "Velkoobchodní cena";
	let azCZ = "až";
	$(".l-col strong:contains('" + usetriteCZ + "')").text(velkoobchodniCenaCZ);

	//for each .price-final-holder get its html and put it into respective .save-price-value
	if ($(".price-final-holder").length > 0) {
		$(".price-final-holder").each(function (i) {
			let price = $(this).html();
			$(".save-price-value").eq(i).html(price);
		});
	} else {
		let soloPriceSelector = $(".l-col .price[data-testid='productCardPrice']");
		if (soloPriceSelector.length > 0) {
			$(".save-price-value").html(soloPriceSelector.text());
		}
	}

	// in .parameter-dependent.default-variant remove text azCZ
	$(".parameter-dependent.default-variant").each(function () {
		let text = $(this).text();
		$(this).text(text.replace(azCZ, ""));
	});
}

/*-----------------------------------------------------------------------------------------------Původní JS*/
/*
function VO_prices() {
	var e = getShoptetDataLayer(),
		o = e.customer;
	if (1 !== o.groupId && !0 === o.registered) {
		var t = e.currencyInfo,
			a = t.symbol,
			n = t.exchangeRate,
			r = t.priceDecimalPlaces;
		if (0 === t.symbolLeft)
			var i = "",
				l = " " + a;
		else (i = a), (l = "");
		var c = $(".price.sub-left-position").closest("tr");
		$(".td-save-price, .td-normal-price").parent().hide(),
			$(".td-code").closest("tr").clone().insertBefore(c).addClass("mo-cena"),
			$(".mo-cena td.l-col").html("<strong>Běžná cena</strong>");
		var s = [];
		$(".mo-cena .variant-code:not(.default-variant)").each(function () {
			var e,
				o = $(this);
			s.push(
				((e = o),
				new Promise((o, t) => {
					var a = "https://api.dominikp.cz/External/dmartini_Jednotlive_Sklady?eshop_id=317799&code=" + e.text().trim(),
						c = new XMLHttpRequest();
					c.open("GET", a, !0),
						(c.onload = function () {
							if (200 === c.status) {
								var a = parseFloat(this.responseText),
									s = (a = (a * n).toFixed(r)).replace(",", ".");
								a = parseFloat(a);
								var d = (i + addThousandSeparators(a) + l).replace(".", ",");
								e.text(d), o(s);
							} else t(new Error("Failed to load data from API"));
						}),
						(c.onerror = function () {
							t(new Error("Request failed"));
						}),
						c.send();
				}))
			);
		}),
			Promise.all(s)
				.then(function (e) {
					var o = Math.min(...e);
					(o = (i + addThousandSeparators(o) + l).replace(".", ",")),
						e.every((o) => o === e[0])
							? $(".mo-cena .variant-code.default-variant").text(o)
							: $(".mo-cena .variant-code.default-variant").text("od " + o),
						$(".vo-cena .price-final-holder").each(function () {
							var e = $(this),
								o = e.text().trim();
							(o = o.replace(",", ".").replace("od", "")), (o = parseFloat(o));
							var t = e
									.attr("class")
									.replace("price-final-holder", "")
									.replace("parameter-dependent", "")
									.replace("noDisplay", "")
									.replace("no-display", "")
									.replace("price-additional-holder", "")
									.trim(),
								a = (
									100 -
									(100 /
										parseFloat(
											$(".mo-cena ." + t)
												.text()
												.replace(",", ".")
												.replace("od", "")
												.trim()
										)) *
										o
								).toFixed(0);
							e.text(e.text().trim() + " (-" + a + " %)");
						});
				})
				.catch(function (e) {}),
			$(c).clone().insertBefore(c).addClass("vo-cena"),
			$("<td>" + c.find(".l-col").html() + "</td>").appendTo(".vo-cena"),
			$(".vo-cena .price").removeClass("sub-left-position price"),
			$(".vo-cena td.l-col").removeAttr("colspan").html("<strong>Velkoobchodní cena</strong>");
	}
}
function addThousandSeparators(e) {
	var o = e.toString().split(".");
	return (o[0] = o[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")), o.join(".");
}
*/
function hodnoceni() {
	if (!$(".id--51").length && $("#footer").length) {
		if ($("html[lang='cs']").length)
			var e = "/hodnoceni-obchodu",
				o = "Hodnocení obchodu",
				t = "Zobrazit více";
		if ($("html[lang='sk']").length) (e = "/hodnotenie-obchodu"), (o = "Hodnotenie obchodu"), (t = "Zobraziť viac");
		if ($("html[lang='en']").length) (e = "/store-rating"), (o = "Store rating"), (t = "Show more");
		if ($("html[lang='de']").length) (e = "/geschaftsbewertung"), (o = "Geschäftsbewertung"), (t = "Weitere anzeigen");
		if ($("html[lang='vi']").length) (e = "/danh-gia-cua-hang"), (o = "Đánh giá cửa hàng"), (t = "Cho xem nhiều hơn");
		if ($("html[lang='hu']").length)
			(e = "/uzleti-ertekeles"), (o = "Webáruház értékelése"), (t = "Több megjelenítése");
		if ($("html[lang='pl']").length) (e = "/opinie-o-sklepie"), (o = "Opinie o sklepie"), (t = "Wyświetlić więcej");
		if ($("html[lang='ro']").length)
			(e = "/evaluarea-magazinului"), (o = "Evaluarea magazinului"), (t = "Afişare mai multe");
		var a = $("html").attr("lang"),
			n = localStorage.getItem("store_rating_save_" + a);
		if (n && !$("#hodnoceniobchodu").length && null != n) {
			const o = JSON.parse(n);
			if (new Date().getTime() > o.expiry) localStorage.removeItem("store_rating_save_" + a), hodnoceni();
			else {
				var r = JSON.parse(n).value;
				$("#dklab_instagram_widget").length
					? $(r).insertBefore("#dklab_instagram_widget")
					: $("#footer").length && $(r).insertBefore("#footer");
				for (var i = $("#hodnoceniobchodu .shop-eval"), l = $("#hodnoceniobchodu .vote-wrap"); l.length; )
					i.append(l.splice(Math.floor(Math.random() * l.length), 1)[0]);
				$("#hodnoceniobchodu .shop-eval-stars").load(`${location.origin}/cache/` + e + " .rate-average-inner");
			}
		} else if (!$("#hodnoceniobchodu").length) {
			var c =
				'            <div id="hodnoceniobchodu" class="container row">                <h2>' +
				o +
				'</h2>                <div class="shop-eval-stars"></div>                <div class="shop-eval-stat"></div>                <br />                <div class="shop-eval"></div>                <div class="shop-stat-all">                <a class="btn" href="' +
				e +
				'/">' +
				t +
				"</strong></a>                </div>            </div>            ";
			$("#dklab_instagram_widget").length
				? $(c).insertBefore("#dklab_instagram_widget")
				: $("#footer").length && $(c).insertBefore("#footer"),
				$("#hodnoceniobchodu .shop-eval-stars").load(`${location.origin}/cache/` + e + " .rate-average-inner"),
				$("#hodnoceniobchodu .shop-eval").load(
					`${location.origin}/cache/` + e + " #content .vote-wrap:lt(20)",
					function () {
						$("#hodnoceniobchodu .vote-wrap:contains('Admin')").remove(),
							$("#hodnoceniobchodu .vote-wrap").each(function () {
								var e = $(this).find(".vote-pic>img"),
									o = $(e).data("src");
								$(e).attr("src", o);
								var t = $(this).find(".vote-content"),
									a = $(t).text(),
									n = $(this).find(".star-off"),
									r = $(this).find(".vote-product-name");
								(!$.trim($(t).html()).length || $(n).length || $(r).length || a.indexOf("??") > -1) && $(this).remove();
							});
						for (var e = $("#hodnoceniobchodu .shop-eval"), o = $("#hodnoceniobchodu .vote-wrap"); o.length; )
							e.append(o.splice(Math.floor(Math.random() * o.length), 1)[0]);
						store_rating_save = document.getElementById("hodnoceniobchodu").outerHTML;
						const t = new Date(),
							n = { value: store_rating_save, expiry: t.getTime() + 72e5 };
						localStorage.setItem("store_rating_save_" + a, JSON.stringify(n));
					}
				);
		}
	}
}
$(document).ready(function () {
	hodnoceni();
	/*VO_prices();*/
});
