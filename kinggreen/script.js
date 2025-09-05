document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("type-product")) {
		addVacuumExplanation();
		addScrollToTopButton();

		function addVacuumExplanation() {
			let customVariantsElement = document.querySelector(".custom-variants");
			if (!customVariantsElement) {
				console.warn("Custom variants element not found.");
				return;
			}
			let thVakuoveBaleni = Array.from(customVariantsElement.querySelectorAll("th")).find(
				(th) => th.textContent.trim().toLowerCase() === "vakuové balení"
			);
			if (!thVakuoveBaleni) {
				console.warn("Vakuové balení element not found.");
				return;
			}
			let basicDescription = document.querySelector("#description .basic-description");
			if (!basicDescription) {
				console.warn("Basic description element not found.");
				return;
			}

			thVakuoveBaleni.classList.add("vacuum-questionmark");

			const customVacuumExplanation = document.createElement("div");
			customVacuumExplanation.className = "vacuum-explanation";
			customVacuumExplanation.innerHTML = `
			<div class="vacuum-description-wrapper">
	<h3 class="vacuum-title">Co je to vakuové balení?</h3>
	<div class="vacuum-description">
		<div class="vacuum-description-image"><img
				src="https://www.kinggreen.cz/user/documents/upload/kingreen_vakuove_baleni.png "
				alt="Vakuové balení" width="906" height="1151" loading="lazy"></div>
		<div class="vacuum-description-text">
			<p>
				Rádi bychom vás informovali, proč nabízíme vakuově balený kratom za nižší cenu než naše vlastní balení s označením
				<b>King</b>.
			</p>
			Vakuové balení je originální 1kg balení, do kterého je prášek zabalen po namletí listů. Toto balení pouze ho
			odešleme tak, jak jsme ho obdrželi a navíc Vám přibalíme uzavíratelné sáčky pro přesypání. Díky tomu šetříme
			čas při přípravě objednávek, a tuto úsporu vám můžeme promítnout i do ceny. Oproti tomu <b>balení King</b> je
			zabalené do uzavíratelného sáčku s naším potiskem. To zabere více času a práce, a proto je výsledná cena
			vyšší. Vakuové balení je tedy ideální volba pro ty, kdo chtějí ušetřit!
		</div>
	</div>
</div>`;
			basicDescription.appendChild(customVacuumExplanation);

			thVakuoveBaleni.addEventListener("click", function () {
				const offset = 200; // Offset in pixels
				const elementPosition = customVacuumExplanation.getBoundingClientRect().top + window.pageYOffset;
				const offsetPosition = elementPosition - offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			});
		}

		function addScrollToTopButton() {
			let basicDescription = document.querySelector("#description .basic-description");
			if (!basicDescription) {
				console.warn("Basic description element not found.");
				return;
			}
			const scrollToTopButton = document.createElement("div");
			scrollToTopButton.className = "scroll-to-top";
			scrollToTopButton.textContent = "Zpět na produkt ↑";
			basicDescription.appendChild(scrollToTopButton);

			scrollToTopButton.addEventListener("click", () => {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			});
		}
	}
});

document.addEventListener("DOMContentLoaded", function () {
	if (!document.body.classList.contains("in-kontakty")) {
		const formContact = document.getElementById("formContact");
		if (formContact) {
			const paragraphs = document.querySelectorAll("p");
			paragraphs.forEach(function (p) {
				if (p.textContent.includes("Máte nějaké otázky?")) {
					p.remove();
				}
			});
		}
	}
});
