/*PREDFESLY KODER*/
const timestamp = Date.now();

const downloadData = "/user/documents/upload/data.json?" + timestamp;
let setupData;
$.getJSON(downloadData, function (data) {
	setupData = data.settings;
});

initheader();
jQuery(document).ready(function ($) {
	setTimeout(function () {
		$("#loader-container").remove();
		// const loaderContainer = document.getElementById("loader-container");
		// const content = document.getElementById("content");

		// // Skryjeme načítací animaci a zobrazíme obsah stránky
		// loaderContainer.style.display = "none";
		// content.style.display = "block";
	}, 500);

	initIndex();
	initProductBlock();
	initFooter();
	changeCategory();
	addAssessment();
});

function initheader() {
	const topHeader = $("<div>", { class: "header-up" }).insertBefore(".header-top");
	const container = $("<div>", { class: "container" }).appendTo(topHeader);
	const leftMenu = $("<div>", { class: "header-left" }).appendTo(container);

	let openHours = "";
	setTimeout(function () {
		const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
		const today = new Date().getDay();
		openHours = "Dnes: " + setupData[days[today]];

		const rightMenu = $("<div>", {
			class: "header-right",
			html: setupData.headerMenu,
		}).appendTo(container);
		$(
			`<ul>
        <li><a href="mailto:` +
				setupData.email +
				`">` +
				setupData.email +
				`</a></li>
        <li><a href="tel:00` +
				setupData.tel.replaceAll(" ", "") +
				`">+` +
				setupData.tel +
				`</a></li>
        <li class='black'>` +
				openHours +
				`</li>
    </ul>`
		).appendTo(leftMenu);

		$("#header-placeholder").addClass("inactive");
	}, 400);
}

function initIndex() {
	$(".next-to-carousel-banners").insertAfter(".benefitBanner.position--benefitHomepage");
	$("section#topBanners").insertAfter(".full-width.benefit-banners-full-width");
	$("section.middle-banner.full-width:eq(0)").insertAfter(
		".products-wrapper.product-slider-holder.has-navigation:eq(0)"
	);
	$("section.middle-banner.full-width:eq(1)").insertAfter(
		".products-wrapper.product-slider-holder.has-navigation:eq(1)"
	);
	$("section.welcome.full-width").insertAfter(".products-wrapper.product-slider-holder.has-navigation:eq(2)");

	$(".blog-wrap").load("/recepty/ #newsWrapper");

	setTimeout(function () {
		$(".news-item img").each(function () {
			const src = $(this).attr("data-src");
			$(this).attr("src", src);
		});
	}, 500);
}

function initProductBlock() {
	$(".products-block .product").each(function () {
		$(this).find("i.icon-cart").removeClass("icon-cart").addClass("icon-plus");
	});
}

function initFooter() {
	$(".footer-newsletter h2").text("Přihlaste se k odběru novinek na Svetpeceni.com");
}

function changeCategory() {
	//$('.breadcrumbs.navigation-home-icon-wrapper').prependTo('#content-wrapper');
	$(".category-top").insertAfter(".breadcrumbs");
	$("ul.active").prevAll("a").addClass("active-button");
}

function addAssessment() {
	// Zkontrolujte, zda jsou data již uložena v sessionStorage
	if (!sessionStorage.getItem("assessmentData")) {
		// Pokud ne, stáhněte data pomocí AJAX
		$.ajax({
			url: "cache/hodnoceni-obchodu/",
			type: "GET",
			success: function (response) {
				// Najděte obsah elementu s třídou .content-inner
				var content = $(response).find(".content-inner").html();

				// Uložte obsah do sessionStorage
				sessionStorage.setItem("assessmentData", content);
			},
			error: function (error) {
				console.error("Chyba při stahování dat:", error);
			},
		});
	}

	addReference();

	setTimeout(function () {
		if (!$(".assessment-wrapper")[0]) {
			addReference();
		}
		$(".vote-pic").each(function () {
			$(this).find(" img").remove();
		});
	}, 2000);

	function addReference() {
		var assessmentData = sessionStorage.getItem("assessmentData");

		if (assessmentData) {
			// Vytvoření obalu pro data
			const wrappedData = $('<div class="assessment-wrapper container"></div>');

			$("<h2/>").text("Hodnocení obchodu").appendTo(wrappedData);
			$("<div/>").addClass("ajaxWraper").html(assessmentData).appendTo(wrappedData);

			// Vložení dat za zadaný element
			$(".full-width.homepage-latest-contribution-full-width").after(wrappedData);
		} else {
			console.warn("Nebyla nalezena žádná uložená data v sessionStorage.");
		}

		$(".in-index .votes-wrap.simple-vote").slick({
			centerMode: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 2,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: false,
			dots: true,

			responsive: [
				{
					breakpoint: 1480,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 2,
						arrows: true,
					},
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 570,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,

						autoplay: false,
					},
				},
			],
		});
		$("div#ratingWrapper").removeClass("full-width");
		$("div#ratingWrapper h1").remove();
		$("div#ratingWrapper a.star").each(function () {
			const $a = $(this);
			const span = $("<span></span>").html($a.html()).addClass($a.attr("class"));
			$.each(this.attributes, function () {
				if (this.name !== "class" && this.name !== "href") {
					span.attr(this.name, this.value);
				}
			});
			$a.replaceWith(span);
		});
	}
}
/*KONEC PREDESLY KODER*/

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
				const pDesc = $product.find(".p-desc");
				if (pDesc) {
					pDesc.remove();
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

if (document.body.classList.contains("in-index")) {
	carouselSlider();
}

function carouselSlider() {
	let scrolledAmount = 0;
	let carousel = document.querySelector("#carousel");
	if (!carousel) {
		console.warn("Carousel element not found");
		return;
	}
	let carouselItems = carousel.querySelectorAll(".item");
	if (!carouselItems || carouselItems.length === 0) {
		console.warn("No carousel items found");
		return;
	}

	let totalCarouselItems = carouselItems.length;
	let carouselItemWidth = window.getComputedStyle(carouselItems[0]).getPropertyValue("flex-basis");
	let carouselItemWidthFloat = parseFloat(carouselItemWidth); // Extracts the numeric value as a float

	let visibleItems = Math.round(100 / carouselItemWidthFloat);

	let carouselControlLeft = carousel.querySelector(".carousel-control.left");
	let carouselControlRight = carousel.querySelector(".carousel-control.right");

	if (carouselControlLeft) {
		carouselControlLeft.classList.add("display-none");
		carouselControlLeft.removeAttribute("href");

		carouselControlLeft.addEventListener("click", function () {
			scrolledAmount = Math.max(scrolledAmount - 1, 0);
			carouselItems.forEach((item) => {
				carouselControlRight.classList.remove("display-none");
				if (scrolledAmount <= 0) {
					item.style.transform = "translateX(0)";
					carouselControlLeft.classList.add("display-none");
				} else {
					item.style.transform = "translateX(-" + 100 * scrolledAmount + "%)";
				}
			});
		});
	}

	if (carouselControlRight) {
		if (totalCarouselItems <= visibleItems) {
			carouselControlRight.classList.add("display-none");
		}
		carouselControlRight.removeAttribute("href");
		carouselControlRight.addEventListener("click", function () {
			scrolledAmount = Math.min(scrolledAmount + 1, totalCarouselItems - visibleItems);
			carouselItems.forEach((item) => {
				carouselControlLeft.classList.remove("display-none");
				if (scrolledAmount >= totalCarouselItems - visibleItems) {
					item.style.transform = "translateX(-" + 100 * (totalCarouselItems - visibleItems) + "%)";
					carouselControlRight.classList.add("display-none");
				} else {
					item.style.transform = "translateX(-" + 100 * scrolledAmount + "%)";
				}
			});
		});
	}
}
