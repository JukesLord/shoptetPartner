const mediaThreshold992 = 992;
let matchesMedia992;

function matchesMedia() {
	matchesMedia992 = window.matchMedia("(min-width: " + mediaThreshold992 + "px)").matches;
}
window.addEventListener("DOMContentLoaded", matchesMedia);
window.addEventListener("resize", matchesMedia);

if (document.body.classList.contains("in-index")) {
	$(".benefitBanner").insertAfter(".welcome-wrapper");
}

let addedMenuClose = false;
let topMenuInitialized = false;

window.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("in-index")) {
		if (matchesMedia992) {
			topMenuInitialized = true;
			addHamburgerMenu();
		}
		window.addEventListener("resize", function () {
			if (topMenuInitialized && !matchesMedia992) {
				topMenuInitialized = false;
				removeHamburgerMenu();
			}
			if (!topMenuInitialized && matchesMedia992) {
				topMenuInitialized = true;
				addHamburgerMenu();
			}
		});
	}
});

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
function removeHamburgerMenu() {
	$("#header > .navigation-wrapper").append($("#header .navigation-buttons"));
	$(".menu-hamburger").remove();
	$(".menu-hamburger-close").remove();
	$("#header > .navigation-wrapper").removeClass("menu-open");
	addedMenuClose = false;
	$("#header > .navigation-wrapper > .header-navigation > div").append($("#header .navigation-buttons"));
}
