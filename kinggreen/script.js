if (document.body.classList.contains("admin-logged")) {
	if (document.body.classList.contains("type-product")) {
		addVacuumExplanation();

		function addVacuumExplanation() {
			let customVariantsElement = document.querySelector(".custom-variants");
			if (!customVariantsElement) {
				return;
			}
			let thVakuoveBaleni = Array.from(customVariantsElement.querySelectorAll("th")).find(
				(th) => th.textContent.trim().toLowerCase() === "vakuové balení"
			);
			if (!thVakuoveBaleni) {
				return;
			}
			console.log(thVakuoveBaleni);
			console.log("test");
		}
	}
}
