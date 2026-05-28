$(document).ready(function () {
	$('h4:contains("Potřebujete pomoc?")')
		.addClass("nevahejte")
		.html(
			"<p class='nevahejte-text-first'><b>Jste krok od dokončení objednávky</b></p><p class='nevahejte-text-second'>Pokud potřebujete poradit, jsme tu pro vás.</p>",
		);
});

$(".toggle-contacts")
	.attr(
		"data-original-text",
		"<p class='nevahejte-text-first'><b>Jste krok od dokončení objednávky</b></p><p class='nevahejte-text-second'>Pokud potřebujete poradit, jsme tu pro vás.</p>",
	)
	.attr(
		"data-text",
		"<p class='nevahejte-text-first'><b>Jste krok od dokončení objednávky</b></p><p class='nevahejte-text-second'>Pokud potřebujete poradit, jsme tu pro vás.</p>",
	)
	.html(
		"<p class='nevahejte-text-first'><b>Jste krok od dokončení objednávky</b></p><p class='nevahejte-text-second'>Pokud potřebujete poradit, jsme tu pro vás.</p>",
	);

$(document).ready(function () {
	$('h4:contains("Potřebujete pomoc?")')
		.addClass("nevahejte")
		.text("Neváhejte a volejte pro individuální nabídku se slevou!");
});

$(".toggle-contacts")
	.attr("data-original-text", "Neváhejte a volejte pro individuální nabídku se slevou!")
	.attr("data-text", "Neváhejte a volejte pro individuální nabídku se slevou!")
	.html("Neváhejte a volejte pro individuální nabídku se slevou!");
