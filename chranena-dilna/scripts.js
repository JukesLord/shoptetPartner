document.addEventListener("DOMContentLoaded", function () {
	$(".navigation-in.menu .menu-level-1").prepend($(".header-top .site-name a").addClass("logo"));

	if (document.body.classList.contains("in-kontakty")) {
		$("#formContact").prev().remove();
	}
});
