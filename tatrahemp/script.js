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
