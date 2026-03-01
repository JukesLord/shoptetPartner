// Lazy-load video with loading gradient placeholder
document.querySelectorAll(".lazy-video-wrapper").forEach((wrapper) => {
	const video = wrapper.querySelector("video");
	if (!video) return;

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				obs.unobserve(wrapper);

				const src = (video.dataset.src || "").replace(/<!--[\s\S]*?-->/g, "").trim();
				if (src) {
					video.src = src;
					video.load();
				}

				video.addEventListener(
					"canplay",
					() => {
						wrapper.classList.add("loaded");
						video.play();
					},
					{ once: true },
				);
			});
		},
		{ rootMargin: "200px" },
	);

	observer.observe(wrapper);
});

// Variant select → custom grid
const variantSelect = document.querySelector("select#simple-variants-select");
if (variantSelect) {
	const options = [...variantSelect.options];

	const grid = document.createElement("div");
	grid.className = "variant-flex";

	options.forEach((opt) => {
		if (opt.index === 0) return; // skip placeholder

		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "variant-btn";
		btn.dataset.value = opt.value;

		// Parse label — split on dash to get size and availability
		const rawText = opt.text.replace(/\u00a0/g, " ").trim();
		const priceMatch = rawText.match(/\(([^)]+)\)$/);
		const price = priceMatch ? priceMatch[1] : "";
		const withoutPrice = rawText.replace(/\s*\([^)]+\)$/, "");
		const size = withoutPrice.split("-")[0].replace("Balenie:", "").trim();

		btn.innerHTML = `<span class="variant-btn__size">${size}</span><span class="variant-btn__price">${price}</span>`;

		const unavailable = opt.dataset.disableButton === "1" && opt.index !== 0;
		if (unavailable) btn.classList.add("is-unavailable");

		btn.addEventListener("click", () => {
			if (unavailable) return;
			grid.querySelectorAll(".variant-btn").forEach((b) => b.classList.remove("is-active"));
			btn.classList.add("is-active");
			variantSelect.value = opt.value;
			variantSelect.dispatchEvent(new Event("change", { bubbles: true }));
		});

		grid.appendChild(btn);
	});

	variantSelect.insertAdjacentElement("afterend", grid);
	variantSelect.style.display = "none";
}
