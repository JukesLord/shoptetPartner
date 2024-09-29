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
