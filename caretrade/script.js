/*OLD caretrade.js*/
/*
$(".subcategories.with-image.image").appendTo(".subcategories.with-image.text");
$(".p-code:first").insertAfter(".availability-value.variant-not-chosen-anchor");
$(".bannery").insertAfter("#homepage-banner");
$('li:contains("Hotelová kosmetika")>ul').attr("id", "hotelova-kosmetika");
$('li:contains("Hotelové vůně")>ul').attr("id", "hotelove-vune");
$('li:contains("Hotelový textil")>ul').attr("id", "textil-a-frote");
$('li:contains("Hotelové vybavení")>ul').attr("id", "hotelove-vybaveni");
$('li:contains("Housekeeping")>ul').attr("id", "vybaveni-pokoje");
$(".reference").insertAfter("ul#1");
$(".reference").insertAfter("ul#1");
$(".blog-fp").insertAfter(".reference");
$("#welcome").insertAfter(".blog-fp");

$(document).ready(function () {
	$(".td-additional-price").insertAfter(".price.sub-left-position");
	$(".td-availability.cell-availability-value").insertAfter(".td-additional-price");
	$(".cell-price-final-value").insertAfter(".td-availability.cell-availability-value");
	$("table#product-detail-info tr:nth-child(2)").insertAfter("table#product-detail-info tr:nth-child(3)");
	$(".bannery").load("/prvky-sablony/bannery-pod-carousel/ .text p");
	$(".doclanku").load("/hotelove-vune/ #subcategories");
});
if ($("body").hasClass("type-category")) {
	$(".chcivybavit-category").insertAfter("#categories");
	$(".chcivybavit-category").load("/prvky-sablony/vybavuji-kategorie/ .obsah");
	$(".vyhody").insertAfter("#top10");
	$(".vyhody").load("/prvky-sablony/vyhody/ .text p");
}
if ($("body").hasClass("in-index")) {
	$(".chcivybavit").insertAfter(".bannery");
	$(".chcivybavit").load("/prvky-sablony/chci-vybavit-main/ .obsah");
	$(".dopravazdarma").insertAfter(".chcivybavit");
	$(".vyhody").insertAfter("#welcome");
	$(".vyhody").load("/prvky-sablony/vyhody/ .text p");
	$(".large-12.row.collapse.header-contacts,.searchform.large-12.medium-12.small-12").wrapAll(
		'<div class="horni-panel"></div>',
	);
}

$(window).ready(function () {
	var width = $(window).width();
	if (width < 768) {
		$(".vyhody").hide("");
		$(".chcivybavit .obsah > p").hide("");
		$(".chcivybavit .obsah > h2").click(function () {
			$(".chcivybavit .obsah > p").toggle();
		});
		$(".chcivybavit-category .obsah > p").hide("");
		$(".chcivybavit-category .obsah > h2").click(function () {
			$(".chcivybavit-category .obsah > p").toggle();
		});

		$(document).ready(function () {
			$(".chcivybavit .obsah > p").hide("");
			$(".chcivybavit .obsah > h2").click(function () {
				$(".chcivybavit .obsah > p").toggle();
			});
		});
		$(document).ajaxComplete(function () {
			$(".chcivybavit .obsah > p").hide("");
			$(".chcivybavit .obsah > h2").click(function () {
				$(".chcivybavit .obsah > p").toggle();
			});
		});
		$(document).ready(function () {
			$(".chcivybavit-category .obsah > p").hide("");
			$(".chcivybavit-category .obsah > h2").click(function () {
				$(".chcivybavit-category .obsah > p").toggle();
			});
		});
		$(document).ajaxComplete(function () {
			$(".chcivybavit-category .obsah > p").hide("");
			$(".chcivybavit-category .obsah > h2").click(function () {
				$(".chcivybavit-category .obsah > p").toggle();
			});
		});
	}
});

loadParameters();

function loadParameters() {
	if ($(".products-block").length > 0) {
		$(".products-block .product").each(function () {
			var baseURL = document.location.origin;
			var link = $(this).find("a.name").attr("href");
			var active = $(this);
			var productDetail = baseURL + link;
			$(this).find("#variants ul").empty();
			$.ajax({
				url: productDetail,
				action: "loadVariants",
				dataType: "html",
				success: function (html) {
					var select = $(html).find(".price-measure").html();
					active.find("a.name").append('<div id="variants" class="col-xs-12"><ul></ul></div>');
				},
			});
		});
	}
}
*/
/*END OF caretrade.js*/

/*EDITED caretrade.js*/
$(".subcategories.with-image.image").appendTo(".subcategories.with-image.text");
$(".p-code:first").insertAfter(".availability-value.variant-not-chosen-anchor");
/* $(".bannery").insertAfter("#homepage-banner"); */
$('li:contains("Hotelová kosmetika")>ul').attr("id", "hotelova-kosmetika");
$('li:contains("Hotelové vůně")>ul').attr("id", "hotelove-vune");
$('li:contains("Hotelový textil")>ul').attr("id", "textil-a-frote");
$('li:contains("Hotelové vybavení")>ul').attr("id", "hotelove-vybaveni");
$('li:contains("Housekeeping")>ul').attr("id", "vybaveni-pokoje");
$(".reference").insertAfter("ul#1");
$(".reference").insertAfter("ul#1");
$(".blog-fp").insertAfter(".reference");
$("#welcome").insertAfter(".blog-fp");

$(document).ready(function () {
	$(".td-additional-price").insertAfter(".price.sub-left-position");
	$(".td-availability.cell-availability-value").insertAfter(".td-additional-price");
	$(".cell-price-final-value").insertAfter(".td-availability.cell-availability-value");
	$("table#product-detail-info tr:nth-child(2)").insertAfter("table#product-detail-info tr:nth-child(3)");
	/* $(".bannery").load("/prvky-sablony/bannery-pod-carousel/ .text p"); */
	$(".doclanku").load("/hotelove-vune/ #subcategories");
});
if ($("body").hasClass("type-category")) {
	$(".chcivybavit-category").insertAfter("#categories");
	$(".chcivybavit-category").load("/prvky-sablony/vybavuji-kategorie/ .obsah");
	$(".vyhody").insertAfter("#top10");
	$(".vyhody").load("/prvky-sablony/vyhody/ .text p");
}
if ($("body").hasClass("in-index")) {
	$(".chcivybavit").insertAfter("#homepage-banner");
	$(".chcivybavit").load("/prvky-sablony/chci-vybavit-main/ .obsah");
	$(".dopravazdarma").insertAfter(".chcivybavit");
	$(".vyhody").insertAfter("#welcome");
	$(".vyhody").load("/prvky-sablony/vyhody/ .text p");
	$(".large-12.row.collapse.header-contacts,.searchform.large-12.medium-12.small-12").wrapAll(
		'<div class="horni-panel"></div>',
	);
}

$(window).ready(function () {
	var width = $(window).width();
	if (width < 768) {
		$(".vyhody").hide("");
		$(".chcivybavit .obsah > p").hide("");
		$(".chcivybavit .obsah > h2").click(function () {
			$(".chcivybavit .obsah > p").toggle();
		});
		$(".chcivybavit-category .obsah > p").hide("");
		$(".chcivybavit-category .obsah > h2").click(function () {
			$(".chcivybavit-category .obsah > p").toggle();
		});

		$(document).ready(function () {
			$(".chcivybavit .obsah > p").hide("");
			$(".chcivybavit .obsah > h2").click(function () {
				$(".chcivybavit .obsah > p").toggle();
			});
		});
		$(document).ajaxComplete(function () {
			$(".chcivybavit .obsah > p").hide("");
			$(".chcivybavit .obsah > h2").click(function () {
				$(".chcivybavit .obsah > p").toggle();
			});
		});
		$(document).ready(function () {
			$(".chcivybavit-category .obsah > p").hide("");
			$(".chcivybavit-category .obsah > h2").click(function () {
				$(".chcivybavit-category .obsah > p").toggle();
			});
		});
		$(document).ajaxComplete(function () {
			$(".chcivybavit-category .obsah > p").hide("");
			$(".chcivybavit-category .obsah > h2").click(function () {
				$(".chcivybavit-category .obsah > p").toggle();
			});
		});
	}
});

loadParameters();

function loadParameters() {
	if ($(".products-block").length > 0) {
		$(".products-block .product").each(function () {
			var baseURL = document.location.origin;
			var link = $(this).find("a.name").attr("href");
			var active = $(this);
			var productDetail = baseURL + link;
			$(this).find("#variants ul").empty();
			$.ajax({
				url: productDetail,
				action: "loadVariants",
				dataType: "html",
				success: function (html) {
					var select = $(html).find(".price-measure").html();
					active.find("a.name").append('<div id="variants" class="col-xs-12"><ul></ul></div>');
				},
			});
		});
	}
}

if (document.body.classList.contains("in-index")) {
	let carousel = document.querySelector("#homepage-banner");
	let carouselInner = document.querySelector("#carousel-banner");
	let carouselItems = document.querySelectorAll("#carousel-banner > div");
	inicializeSliderElement(carousel, carouselInner, carouselItems, "carousel-slider", "img");
}
function inicializeSliderElement(sliderWrapper, sliderParent, sliderItem, customClass, itemForHeightForControls) {
	if (!sliderParent || !sliderItem || sliderItem.length === 0) {
		console.warn("inicializeSliderElement has been tried to be initialized with invalid parameters.");
		return;
	}

	if (!sliderWrapper) {
		const sliderWrapperElement = document.createElement("div");
		sliderWrapperElement.classList.add("slider-custom-wrapper");
		sliderParent.parentNode.insertBefore(sliderWrapperElement, sliderParent);
		sliderWrapperElement.appendChild(sliderParent);
		sliderWrapper = sliderWrapperElement;
	}
	sliderWrapper.classList.add(customClass, "slider-custom-wrapper");

	createControls();
	enableDragging();

	function createControls() {
		console.log("Creating controls for slider:", sliderWrapper);
		let initialControls = document.querySelectorAll("#carousel-banner > a");
		if (initialControls && initialControls.length > 0) {
			initialControls.forEach((control) => control.remove());
			console.log("Existing controls removed before creating new ones.");
		}
		console.log("Za ifem");
		const leftControl = document.createElement("div");
		leftControl.classList.add("carousel-control", "left", "hidden-control");
		leftControl.setAttribute("role", "button");
		leftControl.setAttribute("data-slide", "prev");

		const rightControl = document.createElement("div");
		rightControl.classList.add("carousel-control", "right");
		rightControl.setAttribute("role", "button");
		rightControl.setAttribute("data-slide", "next");

		sliderWrapper.appendChild(leftControl);
		sliderWrapper.appendChild(rightControl);

		leftControl.addEventListener("click", () => slide("left"));
		rightControl.addEventListener("click", () => slide("right"));

		setTopPositionOfControls();
		document.addEventListener("DOMContentLoaded", setTopPositionOfControls);
		window.addEventListener("resize", setTopPositionOfControls);

		function setTopPositionOfControls() {
			let heightItem;
			if (itemForHeightForControls) {
				heightItem = sliderItem[0].querySelector(itemForHeightForControls);
			} else {
				heightItem = sliderItem[0];
			}
			if (heightItem) {
				const style = window.getComputedStyle(heightItem);
				const marginTop = parseFloat(style.marginTop) || 0;
				const marginBottom = parseFloat(style.marginBottom) || 0;
				const heightOfItem = heightItem.offsetHeight || 0;
				const totalHeight = heightOfItem + marginTop + marginBottom;
				leftControl.style.top = totalHeight / 2 + "px";
				rightControl.style.top = totalHeight / 2 + "px";
				if (totalHeight === 0) {
					leftControl.style.top = "50%";
					rightControl.style.top = "50%";
				}
			} else {
				leftControl.style.top = "50%";
				rightControl.style.top = "50%";
			}
		}

		//if sliderParent is not scrollable hide controls
		if (sliderParent.scrollWidth <= sliderParent.clientWidth) {
			leftControl.classList.add("hidden-control");
			rightControl.classList.add("hidden-control");
		}
	}

	function slide(direction) {
		if (sliderParent.classList.contains("sliding")) return;
		sliderParent.classList.add("sliding");

		const numberOfItems = parseInt(getComputedStyle(sliderWrapper).getPropertyValue("--number-of-items")) || 1;
		const gapValue = parseInt(getComputedStyle(sliderParent).getPropertyValue("--gap")) || 0;
		const largeItemMultiplier =
			parseFloat(getComputedStyle(sliderWrapper).getPropertyValue("--width-multiplier-of-1st-item")) - 1 || 0;
		const nextItemPreview = parseInt(getComputedStyle(sliderWrapper).getPropertyValue("--next-item-preview")) || 0;

		let scrollAmount;
		/* 	if (sliderItem.length > 2) {
			scrollAmount =
				sliderItem[2]?.offsetWidth * numberOfItems +
					gapValue * (numberOfItems - largeItemMultiplier - 1) +
					nextItemPreview || 200;
			
		} else {
			scrollAmount =
				sliderItem[0]?.offsetWidth * numberOfItems +
					gapValue * (numberOfItems - largeItemMultiplier - 1) +
					nextItemPreview || 200;
		} */

		scrollAmount = sliderParent.offsetWidth - (nextItemPreview - gapValue);

		const to = direction === "left" ? sliderParent.scrollLeft - scrollAmount : sliderParent.scrollLeft + scrollAmount;

		sliderParent.scrollTo({ left: to, behavior: "smooth" });

		setTimeout(() => {
			sliderParent.classList.remove("sliding");
		}, 300);
	}

	function enableDragging() {
		let isDragging = false;
		let startX = 0;
		let startScrollLeft = 0;
		let moved = false;
		let activePointerId = null;
		let moveThreshold = 5; // px

		// Start drag
		const onPointerDown = (e) => {
			// Only primary button if mouse
			if (e.pointerType === "mouse" && e.button !== 0) return;

			isDragging = true;
			moved = false;
			activePointerId = e.pointerId;

			startX = e.clientX;
			startScrollLeft = sliderParent.scrollLeft;

			sliderParent.classList.add("grabbing");

			// Attach move/up/cancel to window for robust dragging
			window.addEventListener("pointermove", onPointerMove);
			window.addEventListener("pointerup", endDrag);
			window.addEventListener("pointercancel", endDrag);
			window.addEventListener("pointerleave", endDrag);
		};

		// Drag move
		const onPointerMove = (e) => {
			if (!isDragging || e.pointerId !== activePointerId) return;

			const dx = e.clientX - startX;
			if (Math.abs(dx) > moveThreshold) moved = true;
			sliderParent.scrollLeft = startScrollLeft - dx;

			e.preventDefault();
		};

		// End/cancel drag
		const endDrag = (e) => {
			if (e && activePointerId !== null && e.pointerId !== activePointerId) return;
			isDragging = false;
			activePointerId = null;
			sliderParent.classList.remove("grabbing");

			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", endDrag);
			window.removeEventListener("pointercancel", endDrag);
			window.removeEventListener("pointerleave", endDrag);
		};

		// Suppress clicks if a drag happened (avoids accidental link/card clicks)
		const onClick = (e) => {
			if (moved) {
				e.preventDefault();
				e.stopPropagation();
				moved = false; // reset
			}
		};

		// Attach pointerdown to sliderWrapper so dragging works from wrapper or any child
		sliderWrapper.addEventListener("pointerdown", onPointerDown);
		sliderParent.addEventListener("click", onClick);

		function removeHiddenControl(element) {
			element.classList.remove("hidden-control");
		}
		function addHiddenControl(element) {
			element.classList.add("hidden-control");
		}

		let leftControl = sliderWrapper.querySelector(".carousel-control.left");
		let rightControl = sliderWrapper.querySelector(".carousel-control.right");
		if (leftControl && rightControl) {
			sliderParent.addEventListener("scroll", () => {
				if (sliderParent.scrollLeft <= 0) {
					addHiddenControl(leftControl);
				} else {
					removeHiddenControl(leftControl);
				}

				if (sliderParent.scrollLeft >= sliderParent.scrollWidth - sliderParent.clientWidth - 1) {
					addHiddenControl(rightControl);
				} else {
					removeHiddenControl(rightControl);
				}
			});
		}
	}
}
