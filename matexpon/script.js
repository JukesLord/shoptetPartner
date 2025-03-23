//if body has class in-index and admin-logged
if (document.body.classList.contains("in-index") && document.body.classList.contains("admin-logged")) {
	let vsechnyProdukty = document.querySelector("#products-1");
	let vsechnyProduktyWrapper = vsechnyProdukty.parentElement;

	removeNavigationVsechnyProdukty();

	document.addEventListener("resizeEnd", function () {
		setTimeout(() => {
			// This code runs when resize has ended
			removeNavigationVsechnyProdukty();
		}, 50);
	});

	function removeNavigationVsechnyProdukty() {
		let vsechnyProduktyPagination = vsechnyProduktyWrapper.querySelector(".product-slider-pagination");
		let vsechnyProduktyNavigation = vsechnyProduktyWrapper.querySelectorAll(".product-slider-navigation");
		vsechnyProduktyPagination.classList.add("custom-display-none");
		vsechnyProduktyNavigation.forEach((item) => {
			item.classList.add("custom-display-none");
		});
	}
}
