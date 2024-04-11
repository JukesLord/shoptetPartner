document.addEventListener("DOMContentLoaded", function () {
	$(".navigation-in.menu .menu-level-1").prepend($(".header-top .site-name a").addClass("logo"));
	$(".navigation-in.menu .menu-level-1").append($(".menu-flags"));
	let menuFlagsCopy = $(".menu-flags").clone();
	$(".menu-helper .menu-level-1").append(menuFlagsCopy);

	if ($("#formContact").length > 0) {
		$("#formContact").prev().remove();
		$(
			'<div class="pdf czech">PDF prezentace naší firmy a služeb které poskytujeme ke stažení <a href="/user/documents/upload/VERPET - prezentace Abhishek - český překlad.pdf" target="blank">ZDE</a>.</div>'
		).insertBefore($("#formContact .consents-first"));
	}
	if (document.body.classList.contains("in-sluzby")) {
		$("#append-div").append($(".nase-cinnosti-block"));
		$(".nase-cinnosti-block").removeClass("display-none");
	}
});
