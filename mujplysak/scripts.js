document.addEventListener("DOMContentLoaded", function () {
	$(".contact-box").append($(".footer-platby-online"));
	$(".footer-platby-online").show();

	if (document.body.classList.contains("in-index")) {
		$(".kde-pomahame").insertAfter($(".dlazdice-wrapper"));
	}
});
