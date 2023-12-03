document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("type-detail")) {
		addButtons();
	}
});

const additionalButtons =
	"<div class='additional-buttons'><a href='/kontakty' class='cst-button konzultace'>Nezávazná konzultace</a><a href='https://www.penizenastrese.cz/garantujeme-nizsi-ceny' class='cst-button'>Chci lepší cenu</a></div>";

function addButtons() {
	$(additionalButtons).insertBefore(".buy-box .add-to-cart");
}
