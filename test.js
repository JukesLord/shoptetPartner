document.querySelectorAll(".more-items-trigger").forEach((trigger) => {
	const parent = trigger.parentElement;
	const totalChildren = parent.children.length;
	let totalMore = totalChildren - 4;
	if (totalChildren > 4) {
		if (totalMore <= 4) {
			trigger.textContent = `Další ${totalMore}`;
		}
		if (totalMore > 4) {
			trigger.textContent = `Další ${totalMore}`;
		}
	}
});

document.addEventListener("shoptet.menu.showSubmenu", function () {
	document.querySelectorAll(".more-items-trigger").forEach((trigger) => {
		const parent = trigger.parentElement;
		const totalChildren = parent.children.length;
		let totalMore = totalChildren - 4;
		if (totalChildren > 4) {
			if (totalMore <= 4) {
				trigger.textContent = `Další ${totalMore}`;
			}
			if (totalMore > 4) {
				trigger.textContent = `Další ${totalMore}`;
			}
		}
	});
});
