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
	if ($(".faq-new").length > 0 && $("body").hasClass("admin-logged")) {
		// Create a wrapper for the FAQ section
		$(".faq-new").removeClass("display-none");
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
