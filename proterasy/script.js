/* if (document.body.classList.contains("admin-logged")) { */
addHrefToBlogHeader();
function addHrefToBlogHeader() {
	if (!document.body.classList.contains("in-index")) {
		return;
	}
	let blogHeader = document.querySelector(".homepage-blog-wrapper .homepage-group-title");
	if (!blogHeader) {
		return;
	}
	let link = document.createElement("a");
	link.href = "/nase-novinky/";
	link.textContent = "Naše novinky";
	blogHeader.innerHTML = "";
	blogHeader.appendChild(link);
}

if (document.body.classList.contains("in-index")) {
	let carousel = document.querySelector("#carousel");
	let carouselInner = document.querySelector(".carousel-inner");
	let carouselItems = document.querySelectorAll("#carousel .item");
	inicializeSliderElement(carousel, carouselInner, carouselItems, "carousel-slider", "a");

	let productsBlocks = document.querySelectorAll(".products-block");
	productsBlocks.forEach((block) => {
		let products = block.querySelectorAll(".product");
		inicializeSliderElement(null, block, products, "products-slider", ".image");
	});
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
		let initialControls = sliderWrapper.querySelectorAll(".carousel-control");
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
/* } */

if (document.body.classList.contains("type-product")) {
	editAlternativeProducts();
	function editAlternativeProducts() {
		const alt = document.querySelector("#tab-content #productsAlternative");
		if (!alt) return;
		alt.classList.remove("fade");
		alt.classList.add("in-product-top");
		const altTitle = document.createElement("h3");
		altTitle.textContent = "Další varianty:";
		alt.prepend(altTitle);

		removeNotAvaiableProducts();
		movePriceStandardToPrices();

		const social = document.querySelector(".p-info-wrapper .social-buttons-wrapper");
		if (social) {
			social.before(alt);
			return;
		}
		const infoWrapper = document.querySelector(".p-info-wrapper");
		if (!infoWrapper) return;
		infoWrapper.append(alt);
	}
	function removeNotAvaiableProducts() {
		const notAvailableProducts = document.querySelectorAll("#productsAlternative .product");
		notAvailableProducts.forEach((product) => {
			if (!product.querySelector(".p-tools form button.add-to-cart-button")) {
				product.remove();
			}
		});
	}
	function movePriceStandardToPrices() {
		const productsWithPriceStandard = document.querySelectorAll("#productsAlternative .product");
		productsWithPriceStandard.forEach((product) => {
			const priceStandard = product.querySelector(".flag-discount");
			const priceWrapper = product.querySelector(".prices");

			if (priceStandard && priceWrapper) {
				priceWrapper.appendChild(priceStandard);
			}
		});
	}
}

materialCalculator();
function materialCalculator() {
	const calculator = document.querySelector("#custom-calculator");
	if (!calculator) return;

	const materials = parseMaterials(calculator);
	if (materials.length === 0) return;

	const widget = buildCalculatorWidget(materials);
	calculator.insertAdjacentElement("afterend", widget);

	// Parse a Czech-formatted number ("18,4", "1 620") into a float; NaN -> 0.
	function parseCzechNumber(text) {
		const value = parseFloat(String(text).replace(/\s/g, "").replace(",", "."));
		return isNaN(value) ? 0 : value;
	}

	// Read #calculator rows into [{ name, pricePerM2 }].
	function parseMaterials(table) {
		const rows = table.querySelectorAll("tbody tr");
		const result = [];
		let current = null;

		rows.forEach((row) => {
			const cells = row.querySelectorAll("td");
			if (cells.length < 3) return;

			const label = cells[0].textContent.trim();
			if (label.startsWith("##")) {
				const img = row.querySelector("img");
				current = {
					name: label.slice(2).trim(),
					pricePerM2: 0,
					image: img ? img.getAttribute("src") : "",
					imageAlt: img ? img.getAttribute("alt") : "",
				};
				result.push(current);
				return;
			}
			if (!label || label.startsWith("--") || !current) return;

			const unitPrice = parseCzechNumber(cells[1].textContent);
			const count = parseCzechNumber(cells[2].textContent);
			current.pricePerM2 += unitPrice * count;
		});

		return result;
	}

	function formatPrice(value) {
		return value.toLocaleString("cs-CZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " Kč";
	}

	function buildCalculatorWidget(materials) {
		const wrapper = document.createElement("div");
		wrapper.classList.add("material-calculator");

		const controls = document.createElement("div");
		controls.classList.add("mc-controls");

		const label = document.createElement("label");
		label.classList.add("mc-area-label");
		label.setAttribute("for", "mc-area-input");
		label.textContent = "Plocha (m²)";

		const input = document.createElement("input");
		input.classList.add("mc-area-input");
		input.id = "mc-area-input";
		input.type = "number";
		input.min = "0";
		input.step = "0.01";
		input.setAttribute("inputmode", "decimal");
		input.value = "1";

		controls.appendChild(label);
		controls.appendChild(input);

		const tiles = document.createElement("div");
		tiles.classList.add("mc-tiles");

		const totalNodes = materials.map((material) => {
			const tile = document.createElement("div");
			tile.classList.add("mc-tile");

			if (material.image) {
				const image = document.createElement("img");
				image.classList.add("mc-tile-image");
				image.src = material.image;
				image.alt = material.imageAlt || material.name;
				image.loading = "lazy";
				tile.appendChild(image);
			}

			const name = document.createElement("span");
			name.classList.add("mc-tile-name");
			name.textContent = material.name;

			const total = document.createElement("span");
			total.classList.add("mc-tile-total");

			const unit = document.createElement("span");
			unit.classList.add("mc-tile-unit");
			unit.textContent = formatPrice(material.pricePerM2) + "/m²";

			tile.appendChild(name);
			tile.appendChild(total);
			tile.appendChild(unit);
			tiles.appendChild(tile);

			return total;
		});

		wrapper.appendChild(controls);
		wrapper.appendChild(tiles);

		function recalc() {
			const area = parseFloat(input.value) || 0;
			materials.forEach((material, index) => {
				totalNodes[index].textContent = formatPrice(material.pricePerM2 * area);
			});
		}

		input.addEventListener("input", recalc);
		recalc();

		return wrapper;
	}
}
