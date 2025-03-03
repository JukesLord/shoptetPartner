//if body contains class in-product
if ($("body").hasClass("type-product")) {
	$(".p-detail-inner .p-final-price-wrapper").insertBefore(".p-detail-inner .p-basic-info-block");
	$("<div id='souvisejici-produkty'><h3>Související produkty</h3></div>").insertBefore(".shp-tabs-holder");
	$("#souvisejici-produkty").append($("#productsRelated"));
}
