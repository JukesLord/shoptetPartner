if ($("body").hasClass("in-index")) {
	let vsechnyProduktyMainTitle = $(".homepage-group-title:contains('Všechny produkty')");
	let vsechnyProduktyWrappery = [];

	let maxVisibleProducts = visibleProductsIncrement;
	let allProducts;

	vsechnyProduktyMainTitle.each(function () {
		vsechnyProduktyWrappery.push($(this).next());
	});

	vsechnyProduktyMainTitle.slice(1).remove();

	indexFunctions();

	$(window).on("resize", function () {
		indexFunctions();
	});

	const userAgent = navigator.userAgent;

	if (/Mobi|Android/i.test(userAgent)) {
	} else if (/Tablet|iPad/i.test(userAgent)) {
	} else {
		$(document).on("resizeEnd", function () {
			setTimeout(() => {
				indexFunctions();
			}, 1);
		});
	}

	/* 	if (window.matchMedia("(min-width: 1024px)").matches) {
		// Adjust the breakpoint as needed
		$(document).on("resizeEnd", function () {
			setTimeout(() => {
				indexFunctions();
			}, 1);
		});
	} */

	function removeNavigation(wrapper) {
		wrapper.find(".product-slider-pagination").addClass("custom-display-none");
		wrapper.find(".product-slider-navigation").each(function () {
			$(this).addClass("custom-display-none");
		});
	}

	function removeDuplicates(wrapper) {
		let vsechnyProdukty = wrapper.find(".product");
		let hasBeenInactive = false;

		let amountOfDuplicates = 0;
		vsechnyProdukty.each(function () {
			if ($(this).hasClass("inactive")) {
				hasBeenInactive = true;
				amountOfDuplicates++;
				console.log($(this));
				console.log("+1 inactive: ");
			} else {
				if (!hasBeenInactive) {
					amountOfDuplicates++;
					console.log($(this));
					console.log("+1 active: ");
				} else {
					console.log($(this));
					console.log("+shouldnt see after this ");
					return false;
					console.log("break");
				}
			}
		});
		console.log("amountOfDuplicates: " + amountOfDuplicates);
		if (amountOfDuplicates > 0) {
			//remove first x products and last x products not in for loop but slice
			/* 			vsechnyProdukty.slice(0, amountOfDuplicates).remove();
			vsechnyProdukty.slice(-amountOfDuplicates).remove(); */
		}
	}

	function mergeWrapperIntoMain(wrapper) {
		let vsechnyProdukty = wrapper.find(".product");
		vsechnyProdukty.each(function () {
			$(this).appendTo(vsechnyProduktyWrappery[0].find(".products-block"));
		});
		wrapper.remove();
	}

	function showNumberOfProducts() {
		allProducts.each(function (index) {
			if (index >= maxVisibleProducts) {
				$(this).addClass("custom-display-none");
			} else {
				$(this).removeClass("custom-display-none");
			}
		});
		if (allProducts.length <= maxVisibleProducts) {
			$(".custom-show-more-button").addClass("custom-display-none");
		}
	}

	function addShowMoreButton() {
		vsechnyProduktyWrappery[0].append("<div class='custom-show-more-button'><span>Zobrazit více</span></div>");
		$(".custom-show-more-button").on("click touchend", function () {
			maxVisibleProducts += visibleProductsIncrement;
			console.log(maxVisibleProducts);
			showNumberOfProducts();
		});
		if (allProducts.length <= maxVisibleProducts) {
			$(".custom-show-more-button").addClass("custom-display-none");
		}
	}

	function indexFunctions() {
		vsechnyProduktyWrappery.forEach(function (wrapper) {
			removeNavigation(wrapper);
			removeDuplicates(wrapper);

			if (vsechnyProduktyWrappery.length > 1) {
				if (vsechnyProduktyWrappery.indexOf(wrapper) !== 0) {
					mergeWrapperIntoMain(wrapper);
				}
			}
		});

		allProducts = vsechnyProduktyWrappery[0].find(".product");

		showNumberOfProducts();
	}
	addShowMoreButton();
}
