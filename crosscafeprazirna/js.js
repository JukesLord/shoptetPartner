if (document.body.classList.contains("in-index")) {
	$(".benefitBanner").insertAfter(".welcome-wrapper");
}

const mediaThreshold992 = 992;
let matchesMedia992;
let addedMenuClose = false;
let topMenuInitialized = false;

function matchesMedia() {
	matchesMedia992 = window.matchMedia("(min-width: " + mediaThreshold992 + "px)").matches;
}
window.addEventListener("DOMContentLoaded", matchesMedia);
window.addEventListener("resize", matchesMedia);

function addHamburgerMenu() {
	$("#header > .navigation-wrapper").append($("#header .navigation-buttons"));
	$("#header > .navigation-wrapper").append("<div class='menu-hamburger'></div>");

	$(".menu-hamburger").on("click", function () {
		$("#header > .navigation-wrapper").addClass("menu-open");
		if (!addedMenuClose) {
			addedMenuClose = true;
			$("#header .menu-open .header-navigation > div").append("<div class='menu-hamburger-close'></div>");
			$(".menu-hamburger-close").on("click", function () {
				$("#header > .navigation-wrapper").removeClass("menu-open");
			});
		}
	});
}

/*Onload if 992+*/
window.addEventListener("DOMContentLoaded", function () {
	if (matchesMedia992) {
		topMenuInitialized = true;
		addHamburgerMenu();
	} else {
		window.addEventListener("resize", function () {
			if (!topMenuInitialized && matchesMedia992) {
				topMenuInitialized = true;
				addHamburgerMenu();
			}
		});
	}
});
