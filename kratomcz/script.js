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
				const dataIndex = $option.data("index");

				// Extract parameter value from the option text
				const parameterMatch = text.match(/: ([^-]+)/);
				const parameter = parameterMatch ? parameterMatch[1].trim() : "";

				// Get discount information
				const originalPrice = $(`.p-info-wrapper .p-final-price-wrapper .price-standard .choose-variant.${dataIndex}`)
					.text()
					.trim();
				const discount = $(`.p-info-wrapper .p-final-price-wrapper .price-save .choose-variant.${dataIndex}`)
					.text()
					.trim();
				const finalPrice = $(`.p-info-wrapper .p-final-price-wrapper .price-final-holder.choose-variant.${dataIndex}`)
					.text()
					.trim();

				// Prepare HTML content with original price and discount if available
				let variantHTML = `<div><span class="variant-mnozstvi">${parameter}</span>`;

				if (originalPrice && discount) {
					variantHTML += `<div class="variant-sale"><span class="variant-original-price">${originalPrice}</span>`;
					variantHTML += `<span class="variant-discount">${discount}</span></div>`;
				}

				variantHTML += `<span class="variant-price">${finalPrice}</span></div>`;

				// Create a clickable div for each option
				const $optionDiv = $("<div>", {
					class: "variant-option",
					"data-value": value,
					"data-index": dataIndex,
					html: variantHTML,
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
		aElementToBtnStyle();
	}
});

function aElementToBtnStyle() {
	// Find all a elements
	$(".p-short-description a").each(function () {
		// Get the text content of the link
		const linkText = $(this).text().trim().toLowerCase();

		// Check if the text matches "co je kratom?" (case insensitive)
		if (linkText === "co je kratom?") {
			// Add the btn class
			$(this).addClass("btn");
		}
	});
}
