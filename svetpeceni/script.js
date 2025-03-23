if ($("body").hasClass("in-krok-1") && $("body").hasClass("admin-logged")) {
	addContactHours();

	function addContactHours() {
		let contactHours = `<div class="contact-hours">
            <h4>Potřebujete poradit?</h4>
            <p>Po-Pá: 8:00-16:00</p>
            </div>`;

		$(contactHours).insertBefore($(".contact-box span.tel"));
		$(".contact-box span.facebook").parent().addClass("custom-facebook-margin");
	}
}
