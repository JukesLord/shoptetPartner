const mediaThreshold768 = 768;
let matchesMedia768;
let resizedForPC = false;
let resizedForMobile = false;
let hasHamburger = false;

function matchesMedia() {
	matchesMedia768 = window.matchMedia("(min-width: " + mediaThreshold768 + "px)").matches;
}
window.addEventListener("DOMContentLoaded", matchesMedia);
window.addEventListener("resize", matchesMedia);

/*Onload if 768+*/
window.addEventListener("DOMContentLoaded", function () {
	if (matchesMedia768) {
		$(".navigation-in.menu .menu-level-1").append($(".top-navigation-contacts .project-phone"));
		$(".navigation-in.menu .menu-level-1").prepend($(".header-top .site-name a").addClass("logo"));
		$(".header-top .site-name").remove();
	}
	resizedForPc = true;
});

/*Onload if 768-*/
window.addEventListener("DOMContentLoaded", function () {
	if (!matchesMedia768) {
		if (!hasHamburger) {
			$(".navigation-in.menu").append("<div class='menu-hamburger'></div>");

			$(".menu-hamburger").on("click", function () {
				$("#header #navigation").toggleClass("open-menu");
			});
			hasHamburger = true;
		}
		$(".navigation-in.menu").append($(".header-top .site-name a").addClass("logo"));
		$(".navigation-in.menu").append($(".top-navigation-contacts .project-phone"));

		$(".header-top .site-name").remove();

		resizedForMobile = true;
	}
});

/*RESIZE if 768+*/
window.addEventListener("resize", function () {
	if (!resizedForPC && matchesMedia768) {
		$(".navigation-in.menu .menu-level-1").append($(".navigation-in.menu .project-phone"));
		$(".navigation-in.menu .menu-level-1").prepend($(".navigation-in.menu .logo"));
		resizedForPc = true;
		resizedForMobile = false;
	}
});

/*RESIZE if 768-*/
window.addEventListener("resize", function () {
	if (!resizedForMobile && !matchesMedia768) {
		if (!hasHamburger) {
			$(".navigation-in.menu").append("<div class='menu-hamburger'></div>");

			$(".menu-hamburger").on("click", function () {
				$("#header #navigation").toggleClass("open-menu");
			});
			hasHamburger = true;
		}
		$(".navigation-in.menu").append($(".navigation-in.menu .menu-level-1 .logo"));
		$(".navigation-in.menu").append($(".navigation-in.menu .menu-level-1 .project-phone"));

		resizedForMobile = true;
		resizedForPc = false;
	}
});
