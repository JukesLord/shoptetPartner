$(document).ready(function () {
	if ($("body").hasClass("type-product")) {
		let productsAlternative = $("#tab-content #productsAlternative");
		if (productsAlternative.length) {
			productsAlternative.insertAfter(".p-detail-inner");
			productsAlternative.prepend("<h3>Podobné produkty:</h3>");
		}
		let productsRelated = $("#tab-content #productsRelated");
		if (productsRelated.length) {
			productsRelated.insertAfter(".p-detail-inner");
			productsRelated.prepend("<h3>Související produkty:</h3>");
		}
	}
});

$(document).ready(function () {
	if ($("body").hasClass("type-product")) {
		let productsRelated = $("#tab-content #productsRelated");
		if (productsRelated.length) {
			productsRelated.insertBefore(".p-detail-tabs-wrapper");
			productsRelated.prepend("<h3>Související produkty:</h3>");
		}
		let productsAlternative = $("#tab-content #productsAlternative");
		if (productsAlternative.length) {
			productsAlternative.insertBefore(".p-detail-tabs-wrapper");
			productsAlternative.prepend("<h3>Podobné produkty:</h3>");
		}
	}
});
