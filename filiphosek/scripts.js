$("#header .navigation-wrapper").append(
	'<div class="hamburger-menu"><img src="https://606260.myshoptet.com/user/documents/upload/Assets/Hamburger menu.svg" alt="Hamburger Menu"></div>'
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
	let currentValue = 1;
	let addedToCart = false;
	const priceId = 404;
	let itemId = "";
	let addToCartButton = $(".add-to-cart-cst-btn #add-product-to-cart");

	getProductInfo();

	let cartInfo;
	let cartItems;
	let item;
	function getProductInfo() {
		cartInfo = dataLayer.find((item) => item.shoptet && item.shoptet.cartInfo);

		cartItems = cartInfo.shoptet.cartInfo.cartItems;
		item = cartItems.find((cartItem) => cartItem.priceId === priceId);
		if (item.quantity > 0) {
			itemId = item.itemId;
			currentValue = item.quantity;
			addedToCart = true;
			addToCartButton.find("div").text("Zobrazit košík");
			$("#add-amount").attr("val", currentValue);
			$("#add-amount span").text(currentValue);
		}
	}

	addToCartButton.on("click touchend", function () {
		if (!addedToCart) {
			shoptet.cartShared.addToCart({ priceId: priceId, amount: currentValue });

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
});
