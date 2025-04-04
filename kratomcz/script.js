//--------------------------------------------------------------------REGISTRACE PRO VELKOOBCHOD
document.addEventListener("DOMContentLoaded", function () {
	// Only check the condition first without storing body
	if (document.body.classList.contains("in-registrace") && window.location.hash === "#velkoobchod") {
		document.querySelector("#koncovy-zakaznik").checked = false;
		document.querySelector("#koncovy-zakaznik").parentElement.remove();

		// Find and select the wholesale customer radio button
		const wholesaleRadio = document.getElementById("velkoobchodni-odberatel");
		if (wholesaleRadio) {
			wholesaleRadio.checked = true;

			// If there's any logic that needs to run when this input changes
			// Trigger a change event
			const event = new Event("change", { bubbles: true });
			wholesaleRadio.dispatchEvent(event);
		}
	}
});

//--------------------------------------------------------------------VARIANTY
//--------------------------------------------------------------------VARIANTY
document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("type-product") && document.body.classList.contains("admin-logged")) {
		// Check if we're on a page with the variants select
		if ($("#simple-variants-select").length) {
			// Create flexbox container for variant options
			const $flexContainer = $("<div>", {
				class: "variant-flex-container",
			});

			// Get all options except the first one (which is "Zvolte variantu")
			$("#simple-variants-select option").each(function (index) {
				if (index === 0) return; // Skip the "Zvolte variantu" option

				const $option = $(this);
				const text = $option.html();
				const value = $option.val();

				// Extract price from the option text
				const priceMatch = text.match(/\(([^)]+)\)/);
				const price = priceMatch ? priceMatch[1] : "";

				// Extract weight from the option text
				const weightMatch = text.match(/Množství: ([^-]+)/);
				const weight = weightMatch ? weightMatch[1].trim() : "";

				// Create a clickable div for each option
				const $optionDiv = $("<div>", {
					class: "variant-option",
					"data-value": value,
					"data-index": index,
					html: `<div><span class="variant-mnozstvi">${weight}</span><span class="variant-price">${price}</span></div>`,
				});

				// Click handler to select the option in the original dropdown
				$optionDiv.on("click", function () {
					const value = $(this).data("value");

					// Update the select element
					$("#simple-variants-select").val(value).trigger("change");

					// Update active state with classes
					$(".variant-option").removeClass("active");
					$(this).addClass("active");
				});

				$flexContainer.append($optionDiv);
			});

			// Insert the flexbox container after the .detail-parameters table
			$(".detail-parameters").after($flexContainer);

			// Highlight the currently selected option when the original dropdown changes
			$("#simple-variants-select").on("change", function () {
				const selectedValue = $(this).val();
				$(".variant-option").each(function () {
					if ($(this).data("value") === selectedValue) {
						$(this).addClass("active");
					} else {
						$(this).removeClass("active");
					}
				});
			});
		}
	}
});
