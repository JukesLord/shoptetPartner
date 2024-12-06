$("#header .navigation-wrapper").append(
	'<div class="hamburger-menu"><img src="https://684632.myshoptet.com/user/documents/upload/Images/Hamburger menu.svg" alt="Hamburger Menu"></div>'
);
$(".menu-level-1").append('<div class="close-hamburger"></div>');

$("#navigation").insertAfter("#header");

$(".hamburger-menu").on("click touchend", function () {
	$("body").addClass("open-menu");

	setTimeout(function () {
		$(document).on("click touchend", closeMenuOnClickOutside);
		$(document).on("keydown", closeMenuOnEscape);
	}, 50);
});

$(".close-hamburger").on("click touchend", function () {
	closeMenu();
});

function closeMenu() {
	$("body").removeClass("open-menu");
	$(document).off("click touchend", closeMenuOnClickOutside);
	$(document).off("keydown", closeMenuOnEscape);
}

function closeMenuOnClickOutside(event) {
	if (!$(event.target).closest(".menu-level-1").length) {
		closeMenu();
	}
}

function closeMenuOnEscape(event) {
	if (event.key === "Escape") {
		closeMenu();
	}
}

$(".site-name").replaceWith(function () {
	return $("<p>", { class: $(this).attr("class"), html: $(this).html() });
});

$(document).ready(function () {
	if ($("body").hasClass("in-index")) {
		let currentValue = 1;
		let addedToCart = false;
		let priceId = 0;
		const itemCode = "44/1 K";
		let itemId = "";
		let addToCartButton = $(".add-to-cart-cst-btn #add-product-to-cart");
		let cartInfo;
		let cartItems;
		let item;

		getProductInfo();

		function getProductInfo() {
			cartInfo = dataLayer.find((item) => item.shoptet && item.shoptet.cartInfo);

			if (cartInfo) {
				cartItems = cartInfo.shoptet.cartInfo.cartItems;
				item = cartItems.find((cartItem) => cartItem.code === itemCode);

				if (item && item.quantity > 0) {
					priceId = item.priceId;
					itemId = item.itemId;
					currentValue = item.quantity;
					addedToCart = true;

					if ($("body").hasClass("in-index")) {
						addToCartButton.find("div").text("Zobrazit košík");
						$("#add-amount").attr("val", currentValue);
						$("#add-amount span").text(currentValue);
					}
				}
			}
		}

		addToCartButton.on("click touchend", function () {
			if (!addedToCart) {
				shoptet.cartShared.addToCart({ productCode: itemCode, amount: currentValue });

				document.addEventListener(
					"ShoptetCartUpdated",
					function () {
						getProductInfo();
					},
					{ once: true }
				);
			} else {
				window.location.href = "/kosik";
			}
		});

		$("#increase-amount").on("click", function () {
			currentValue++;
			$("#add-amount").attr("val", currentValue);
			$("#add-amount span").text(currentValue);

			if (addedToCart) {
				shoptet.cartShared.updateQuantityInCart({ itemId: itemId, priceId: priceId, amount: currentValue });
			}
		});

		$("#decrease-amount").on("click", function () {
			if (currentValue > 1) {
				currentValue--;
				$("#add-amount").attr("val", currentValue);
				$("#add-amount span").text(currentValue);
			}
			if (addedToCart) {
				shoptet.cartShared.updateQuantityInCart({ itemId: itemId, priceId: priceId, amount: currentValue });
			}
		});
	}

	if ($("body").hasClass("type-product")) {
		$(document).ready(function () {
			$(".p-image img").attr(
				"src",
				"https://684632.myshoptet.com/user/documents/upload/Images/Filter_animation_gif.gif"
			);
			$(".p-thumbnails-inner > div > a:first-of-type").attr(
				"href",
				"https://684632.myshoptet.com/user/documents/upload/Images/Filter_animation_gif.gif"
			);
			$(".p-thumbnails-inner > div > a:first-of-type img").attr(
				"src",
				"https://684632.myshoptet.com/user/documents/upload/Images/Filter_animation_gif.gif"
			);
			$(".p-thumbnails-inner > div > a:first-of-type img").attr(
				"data-src",
				"https://684632.myshoptet.com/user/documents/upload/Images/Filter_animation_gif.gif"
			);
		});
		let starWrapper = $(".stars-wrapper");
		let star = $(".stars-wrapper .stars .star");
		let ratingTab = $(".tab-content #ratingTab");

		starWrapper.insertAfter($(".p-final-price-wrapper"));
		ratingTab.prepend("<h3>Recenze produktu:</h3>");
		let ratingTabOffset = ratingTab.offset().top;

		//wait 500ms for listeners to load
		setTimeout(function () {
			star.off("shown");
			ratingTabOffset = ratingTab.offset().top;
		}, 500);

		starWrapper.on("click touchend", function () {
			$("html, body").animate(
				{
					scrollTop: ratingTabOffset - 140,
				},
				500
			);
		});

		let emptyKosik = true;
		let appendedHref = false;
		let cartInfo;
		let cartItems;
		function checkCart() {
			cartInfo = dataLayer.find((item) => item.shoptet && item.shoptet.cartInfo);
			cartItems = cartInfo.shoptet.cartInfo.cartItems;
			if (cartItems.length > 0) {
				emptyKosik = false;
			} else {
				emptyKosik = true;
			}
		}
		function appendHref() {
			if (!emptyKosik && !appendedHref) {
				appendedHref = true;
				$(".p-detail-inner .p-data-wrapper").append(
					'<div class="href-to-cart"><a href="/kosik">Přejít do košíku →</div>'
				);
			}
		}
		checkCart();
		appendHref();
		document.addEventListener("ShoptetCartUpdated", function () {
			checkCart();
			appendHref();
		});
	}
});
