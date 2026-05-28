/*OLD caretrade.js*/
/*
$(".subcategories.with-image.image").appendTo(".subcategories.with-image.text");
$(".p-code:first").insertAfter(".availability-value.variant-not-chosen-anchor");
$(".bannery").insertAfter("#homepage-banner");
$('li:contains("Hotelová kosmetika")>ul').attr("id", "hotelova-kosmetika");
$('li:contains("Hotelové vůně")>ul').attr("id", "hotelove-vune");
$('li:contains("Hotelový textil")>ul').attr("id", "textil-a-frote");
$('li:contains("Hotelové vybavení")>ul').attr("id", "hotelove-vybaveni");
$('li:contains("Housekeeping")>ul').attr("id", "vybaveni-pokoje");
$(".reference").insertAfter("ul#1");
$(".reference").insertAfter("ul#1");
$(".blog-fp").insertAfter(".reference");
$("#welcome").insertAfter(".blog-fp");

$(document).ready(function () {
	$(".td-additional-price").insertAfter(".price.sub-left-position");
	$(".td-availability.cell-availability-value").insertAfter(".td-additional-price");
	$(".cell-price-final-value").insertAfter(".td-availability.cell-availability-value");
	$("table#product-detail-info tr:nth-child(2)").insertAfter("table#product-detail-info tr:nth-child(3)");
	$(".bannery").load("/prvky-sablony/bannery-pod-carousel/ .text p");
	$(".doclanku").load("/hotelove-vune/ #subcategories");
});
if ($("body").hasClass("type-category")) {
	$(".chcivybavit-category").insertAfter("#categories");
	$(".chcivybavit-category").load("/prvky-sablony/vybavuji-kategorie/ .obsah");
	$(".vyhody").insertAfter("#top10");
	$(".vyhody").load("/prvky-sablony/vyhody/ .text p");
}
if ($("body").hasClass("in-index")) {
	$(".chcivybavit").insertAfter(".bannery");
	$(".chcivybavit").load("/prvky-sablony/chci-vybavit-main/ .obsah");
	$(".dopravazdarma").insertAfter(".chcivybavit");
	$(".vyhody").insertAfter("#welcome");
	$(".vyhody").load("/prvky-sablony/vyhody/ .text p");
	$(".large-12.row.collapse.header-contacts,.searchform.large-12.medium-12.small-12").wrapAll(
		'<div class="horni-panel"></div>',
	);
}

$(window).ready(function () {
	var width = $(window).width();
	if (width < 768) {
		$(".vyhody").hide("");
		$(".chcivybavit .obsah > p").hide("");
		$(".chcivybavit .obsah > h2").click(function () {
			$(".chcivybavit .obsah > p").toggle();
		});
		$(".chcivybavit-category .obsah > p").hide("");
		$(".chcivybavit-category .obsah > h2").click(function () {
			$(".chcivybavit-category .obsah > p").toggle();
		});

		$(document).ready(function () {
			$(".chcivybavit .obsah > p").hide("");
			$(".chcivybavit .obsah > h2").click(function () {
				$(".chcivybavit .obsah > p").toggle();
			});
		});
		$(document).ajaxComplete(function () {
			$(".chcivybavit .obsah > p").hide("");
			$(".chcivybavit .obsah > h2").click(function () {
				$(".chcivybavit .obsah > p").toggle();
			});
		});
		$(document).ready(function () {
			$(".chcivybavit-category .obsah > p").hide("");
			$(".chcivybavit-category .obsah > h2").click(function () {
				$(".chcivybavit-category .obsah > p").toggle();
			});
		});
		$(document).ajaxComplete(function () {
			$(".chcivybavit-category .obsah > p").hide("");
			$(".chcivybavit-category .obsah > h2").click(function () {
				$(".chcivybavit-category .obsah > p").toggle();
			});
		});
	}
});

loadParameters();

function loadParameters() {
	if ($(".products-block").length > 0) {
		$(".products-block .product").each(function () {
			var baseURL = document.location.origin;
			var link = $(this).find("a.name").attr("href");
			var active = $(this);
			var productDetail = baseURL + link;
			$(this).find("#variants ul").empty();
			$.ajax({
				url: productDetail,
				action: "loadVariants",
				dataType: "html",
				success: function (html) {
					var select = $(html).find(".price-measure").html();
					active.find("a.name").append('<div id="variants" class="col-xs-12"><ul></ul></div>');
				},
			});
		});
	}
}
*/
/*END OF caretrade.js*/

/*EDITED caretrade.js*/
$(".subcategories.with-image.image").appendTo(".subcategories.with-image.text");
$(".p-code:first").insertAfter(".availability-value.variant-not-chosen-anchor");
/* $(".bannery").insertAfter("#homepage-banner"); */
$('li:contains("Hotelová kosmetika")>ul').attr("id", "hotelova-kosmetika");
$('li:contains("Hotelové vůně")>ul').attr("id", "hotelove-vune");
$('li:contains("Hotelový textil")>ul').attr("id", "textil-a-frote");
$('li:contains("Hotelové vybavení")>ul').attr("id", "hotelove-vybaveni");
$('li:contains("Housekeeping")>ul').attr("id", "vybaveni-pokoje");
$(".reference").insertAfter("ul#1");
$(".reference").insertAfter("ul#1");
$(".blog-fp").insertAfter(".reference");
$("#welcome").insertAfter(".blog-fp");

$(document).ready(function () {
	$(".td-additional-price").insertAfter(".price.sub-left-position");
	$(".td-availability.cell-availability-value").insertAfter(".td-additional-price");
	$(".cell-price-final-value").insertAfter(".td-availability.cell-availability-value");
	$("table#product-detail-info tr:nth-child(2)").insertAfter("table#product-detail-info tr:nth-child(3)");
	/* $(".bannery").load("/prvky-sablony/bannery-pod-carousel/ .text p"); */
	$(".doclanku").load("/hotelove-vune/ #subcategories");
});
if ($("body").hasClass("type-category")) {
	$(".chcivybavit-category").insertAfter("#categories");
	$(".chcivybavit-category").load("/prvky-sablony/vybavuji-kategorie/ .obsah");
	$(".vyhody").insertAfter("#top10");
	$(".vyhody").load("/prvky-sablony/vyhody/ .text p");
}
if ($("body").hasClass("in-index")) {
	$(".chcivybavit").insertAfter("#homepage-banner");
	$(".chcivybavit").load("/prvky-sablony/chci-vybavit-main/ .obsah");
	$(".dopravazdarma").insertAfter(".chcivybavit");
	$(".vyhody").insertAfter("#welcome");
	$(".vyhody").load("/prvky-sablony/vyhody/ .text p");
	$(".large-12.row.collapse.header-contacts,.searchform.large-12.medium-12.small-12").wrapAll(
		'<div class="horni-panel"></div>',
	);
}

$(window).ready(function () {
	var width = $(window).width();
	if (width < 768) {
		$(".vyhody").hide("");
		$(".chcivybavit .obsah > p").hide("");
		$(".chcivybavit .obsah > h2").click(function () {
			$(".chcivybavit .obsah > p").toggle();
		});
		$(".chcivybavit-category .obsah > p").hide("");
		$(".chcivybavit-category .obsah > h2").click(function () {
			$(".chcivybavit-category .obsah > p").toggle();
		});

		$(document).ready(function () {
			$(".chcivybavit .obsah > p").hide("");
			$(".chcivybavit .obsah > h2").click(function () {
				$(".chcivybavit .obsah > p").toggle();
			});
		});
		$(document).ajaxComplete(function () {
			$(".chcivybavit .obsah > p").hide("");
			$(".chcivybavit .obsah > h2").click(function () {
				$(".chcivybavit .obsah > p").toggle();
			});
		});
		$(document).ready(function () {
			$(".chcivybavit-category .obsah > p").hide("");
			$(".chcivybavit-category .obsah > h2").click(function () {
				$(".chcivybavit-category .obsah > p").toggle();
			});
		});
		$(document).ajaxComplete(function () {
			$(".chcivybavit-category .obsah > p").hide("");
			$(".chcivybavit-category .obsah > h2").click(function () {
				$(".chcivybavit-category .obsah > p").toggle();
			});
		});
	}
});

loadParameters();

function loadParameters() {
	if ($(".products-block").length > 0) {
		$(".products-block .product").each(function () {
			var baseURL = document.location.origin;
			var link = $(this).find("a.name").attr("href");
			var active = $(this);
			var productDetail = baseURL + link;
			$(this).find("#variants ul").empty();
			$.ajax({
				url: productDetail,
				action: "loadVariants",
				dataType: "html",
				success: function (html) {
					var select = $(html).find(".price-measure").html();
					active.find("a.name").append('<div id="variants" class="col-xs-12"><ul></ul></div>');
				},
			});
		});
	}
}

console.log("Hello, Caretrade!");
