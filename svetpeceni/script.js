if ($("body").hasClass("in-krok-1")) {
	addContactHours();

	function addContactHours() {
		let contactHours = `<div class="contact-hours">
            <h4>Potřebujete poradit? Volejte v časech:</h4>
            <p>Po–Čt: 8:00–17:00</p>
			<p>Pá: 8:00–15:00</p>
            </div>`;

		$(contactHours).insertBefore($(".contact-box span.tel"));
		$(".contact-box span.facebook").parent().addClass("custom-facebook-margin");
	}
}

/*FAQ*/
$(document).ready(function () {
	if ($(".faq-new").length > 0 && $("body").hasClass("admin-logged")) {
		// Create a wrapper for the FAQ section
		$(".faq-new").removeClass("display-none");
		$(".faq-new").wrapInner('<div class="faq-wrapper"></div>');

		// Keep the heading outside the wrapper
		var heading = $(".faq-new h3").first();
		heading.prependTo(".faq-new");

		// Process each FAQ block as a whole unit instead of individual elements
		var faqHTML = $(".faq-wrapper").html();
		var processedHTML = "";

		// Split content by FAQ start markers
		var faqBlocks = faqHTML.split("<p>###FAQ-začátek</p>");

		// Skip the first element which is empty or contains content before the first FAQ
		for (var i = 1; i < faqBlocks.length; i++) {
			var block = faqBlocks[i];

			// Get the question part
			var questionParts = block.split("<p>###FAQ-otázka</p>");
			var beforeQuestion = questionParts[0]; // Should be empty
			var afterQuestion = questionParts[1];

			// Get the answer part and end marker
			var answerParts = afterQuestion.split("<p>###FAQ-odpověď</p>");
			var questionContent = answerParts[0];

			// Get the content until the end marker
			var endParts = answerParts[1].split("<p>###FAQ-konec</p>");
			var answerContent = endParts[0];
			var afterEnd = endParts[1] || "";

			// Create the FAQ content structure
			processedHTML +=
				'<div class="faq-content">' +
				'<div class="faq-question">' +
				questionContent +
				"</div>" +
				'<div class="faq-answer">' +
				answerContent +
				"</div>" +
				"</div>" +
				afterEnd;
		}

		// Replace the content
		$(".faq-wrapper").html(processedHTML);

		// Add click handlers for toggling answers
		$(".faq-wrapper").on("click", ".faq-question", function () {
			$(this).siblings(".faq-answer").slideToggle(200);
			$(this).parent(".faq-content").toggleClass("active");
		});

		// Initially hide answers
		$(".faq-answer").hide();
	}
});

/*varianty produktů*/
document.addEventListener("DOMContentLoaded", function (event) {
	if (document.body.classList.contains("admin-logged")) {
		if (document.body.classList.contains("type-detail")) {
			/*alternative varianty podobné*/
			let productAlternativeWrapper = $(".products-alternative-wrapper");
			let productsAlternative = productAlternativeWrapper.find(".product");

			if (productsAlternative.length > 0) {
				productAlternativeWrapper.insertBefore(".p-detail-inner .social-buttons-wrapper");
				$("<span class='variants-text'>Další varianty:</span>").insertBefore(productAlternativeWrapper);

				productsAlternative.each(function (product) {
					//change every product > div to product > a with href product.find("a").attr("href")
					let $product = $(product);
					variantsBlock.append($product);
					let image = $product.find(".image img");
					let dataSrc = image.attr("data-src");
					image.attr("src", dataSrc);
				});
			}
			$(".products-alternative-header").remove();
			if (productsAlternative.length > 4) {
				$("<div id='show-more-variants'>Všechny varianty</div>").insertAfter(productAlternativeWrapper);

				$("#show-more-variants").click(function () {
					productAlternativeWrapper.toggleClass("show-all");
				});
			}

			function removeDuplicates() {
				console.log("removeDuplicates");
				let productsAllAlternatives = $(".products-alternative-wrapper .product");
				let seenMicroIds = new Set();
				let removedCount = 0;

				productsAllAlternatives.each(function (index, product) {
					let $product = $(product);
					let $p = $product.find(".p");
					let microId = $p.attr("data-micro-identifier");

					if (microId && seenMicroIds.has(microId)) {
						// This is a duplicate, remove it
						$product.remove();
						removedCount++;
					} else if (microId) {
						// First time seeing this microId, add to set
						seenMicroIds.add(microId);
					}
				});
			}

			// Call the function to execute
			removeDuplicates();
			window.addEventListener("resize", function () {
				removeDuplicates();
			});
			document.addEventListener("resizeEnd", function () {
				//timeout 100ms
				setTimeout(function () {
					removeDuplicates();
				}, 100);
			});
		}
	}
});
