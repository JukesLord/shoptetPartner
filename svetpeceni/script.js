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
