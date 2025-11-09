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
	if ($(".faq-new").length > 0) {
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
	if (document.body.classList.contains("type-detail")) {
		/*alternative varianty podobné*/
		let productAlternativeWrapper = $(".products-alternative-wrapper");
		let productsAlternative = productAlternativeWrapper.find(".product");

		if (productAlternativeWrapper.length) {
			productAlternativeWrapper.find(".products-block").addClass("products-block-alternatives");
		}

		if (productsAlternative.length > 0) {
			productAlternativeWrapper.insertBefore(".p-detail-inner .social-buttons-wrapper");
			$("<span class='variants-text'>Další varianty:</span>").insertBefore(productAlternativeWrapper);
		}
		$(".products-alternative-header").remove();
		/* 			if (productsAlternative.length > 4) {
				$("<div id='show-more-variants'>Všechny varianty</div>").insertAfter(productAlternativeWrapper);

				$("#show-more-variants").click(function () {
					productAlternativeWrapper.toggleClass("show-all");
				});
			} */

		function removeDuplicates() {
			console.log("removeDuplicates");
			let productsAllAlternatives = $(".products-alternative-wrapper .product");
			let productsAlternativeProductsBlock = $(".products-alternative-wrapper .products-block");
			productsAlternativeProductsBlock.addClass("products-block-alternatives");
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

		removeDuplicates();
		window.addEventListener("resize", function () {
			removeDuplicates();
		});
		document.addEventListener("resizeEnd", function () {
			//timeout 100ms
			setTimeout(function () {
				removeDuplicates();
			}, 1);
		});
	}
});

/*-------------------měrná cena S DPH*/
document.addEventListener("DOMContentLoaded", function (event) {
	if (document.body.classList.contains("type-product")) {
		$(".price-measure span").each(function () {
			let text = $(this).html();
			// Replace "Kč" with "Kč s DPH"
			text = text.replace("Kč", "Kč s DPH");
			//add (jednotková cena) after the price
			text = text + " (jednotková cena)";
			$(this).html(text);
		});
	}
});

let addedTextToDelivery = false;
/*-------------------slevový kupón osobní odběr*/
document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("in-krok-1")) {
		if (dataLayer[0].shoptet.cartInfo.discountCoupon.code) {
			let osobniOdberMethod = document.querySelector("#shipping-4");

			if (osobniOdberMethod.classList.contains("active")) {
				disableAllPaymentsExceptCard();
			}

			document.addEventListener("ShoptetBillingMethodUpdated", function () {
				if (osobniOdberMethod.classList.contains("active")) {
					disableAllPaymentsExceptCard();
				}
			});
		}
	}
});

function disableAllPaymentsExceptCard() {
	let paymentMenthodCardDataId = ["billing-65", "billingId-68", "billing-71", "billing-83"];
	let paymentMethodCardName = ["Online", "Google", "Apple", "Platba předem", "Rychlá platba"];
	let paymentMethods = document.querySelectorAll("#order-billing-methods > .radio-wrapper");

	paymentMethods.forEach(function (method) {
		let radioInput = method.querySelector("input[type='radio']");
		let paymentName = method.querySelector(".shipping-billing-name").textContent.trim();
		let label = method.querySelector("label");

		console.log("Payment Name:", paymentName);

		// Check if the payment method name is in the peymentMethodCardName array
		if (!paymentMethodCardName.some((cardName) => paymentName.includes(cardName))) {
			method.classList.add("inactive-child");
			method.classList.remove("active");
			radioInput.checked = false;
			radioInput.disabled = true;
			label.classList.add("inactive");
			label.classList.remove("active");
		}

		// Check if the data-id is included in the paymentMenthodCardDataId array
		/* 		if (!paymentMenthodCardDataId.includes(method.getAttribute("data-id"))) {
			method.classList.add("inactive-child");
			method.classList.remove("active");
			radioInput.checked = false;
			radioInput.disabled = true;
			label.classList.add("inactive");
			label.classList.remove("active");
		} */
	});
	if (addedTextToDelivery) {
		return;
	} else {
		addedTextToDelivery = true;
		let osobniOdberMethod = document.querySelector("#shipping-4");
		const kuponTextSpan = document.createElement("span");
		kuponTextSpan.className = "delivery-text-coupon";
		kuponTextSpan.innerHTML = "Při uplatnění kódu a osobním odběru na brněnské pobočce je nutné provést platbu předem.";
		osobniOdberMethod.append(kuponTextSpan);
	}
}

/*HOMEPAGEBLOG*/
document.addEventListener("DOMContentLoaded", function () {
	if (document.body.classList.contains("in-index")) {
		let welcomeWrapper = document.querySelector(".welcome-wrapper");
		let homepageBlogWrapper = document.querySelector(".homepage-blog-wrapper");
		if (welcomeWrapper && homepageBlogWrapper) {
			// Move the homepage blog wrapper before the welcome wrapper
			welcomeWrapper.insertAdjacentElement("afterend", homepageBlogWrapper);
		}
	}
});

/*Products block edit*/
function editProductsBlock() {
	if (!document.body.classList.contains("admin-logged")) {
		return;
	}
	let productsInProductsBlock = document.querySelectorAll(".products-block:not(.products-block-alternatives) .product");
	if (!productsInProductsBlock || productsInProductsBlock.length === 0) return;
	productsInProductsBlock.forEach(function (product) {
		const pCode = product.querySelector(".p-code");
		const pIn = product.querySelector(".p-in");
		if (pCode && pIn) {
			pIn.appendChild(pCode);
		}

		const priceSave = product.querySelector(".prices .price-save");
		const image = product.querySelector(".image");
		if (priceSave && image) {
			priceSave.textContent = priceSave.textContent.replace("(", "");
			priceSave.textContent = priceSave.textContent.replace(")", "");
			image.appendChild(priceSave);
		}
	});
}

document.addEventListener("DOMContentLoaded", function () {
	editProductsBlock();
});

document.addEventListener("ShoptetDOMContentLoaded", function () {
	editProductsBlock();
});
