(function ($) {
	"use strict";

	// COLOR MODE
	$(".color-mode").click(function () {
		$(".color-mode-icon").toggleClass("active");
		$("body").toggleClass("dark-mode");
	});

	// HEADER
	$(".navbar").headroom();

	// PROJECT CAROUSEL
	$(".owl-carousel").owlCarousel({
		items: 1,
		loop: true,
		margin: 10,
		nav: true,
	});

	// SMOOTHSCROLL
	$(function () {
		$(".nav-link, .custom-btn-link").on("click", function (event) {
			var $anchor = $(this);
			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $($anchor.attr("href")).offset().top - 49,
					},
					1000
				);
			event.preventDefault();
		});
	});

	// TOOLTIP
	$(".social-links a").tooltip();
})(jQuery);

//SOCIAL MEDIA LINKS

$("#social-media-linedin").click(function () {
	window.open("https://www.linkedin.com/in/kannan-v-g-15758421b/", "_blank");
});
$("#social-media-github").click(function () {
	window.open("https://github.com/kannanvg100/", "_blank");
});
$("#social-media-twitter").click(function () {
	window.open("https://www.twitter.com/kannan_vg/", "_blank");
});
$("#social-media-youtube").click(function () {
	window.open("https://www.youtube.com/@kannanvg6876/", "_blank");
});

$("#social-media-whatsapp").click(function () {
	window.open("https://wa.me/919895270766", "_blank");
});

// FORM VALIDATION

$(function () {
	$("#enquiryForm").validate({
		// in 'rules' user have to specify all the constraints for respective fields
		rules: {
			first_name: {
				required: true,
				minlength: 3, //for length of lastname
			},
			last_name: "required",
			email: {
				required: true,
				email: true,
			},
			subject: {
				required: true,
				minlength: 3, //for length of lastname
			},
			message: {
				required: true,
				minlength: 10, //for length of lastname
			},
		},
		// in 'messages' user have to specify message as per rules
		messages: {
			first_name: {
				required: " Please enter a username",
				minlength: " Your username must consist of at least 2 characters",
			},
			last_name: " Please enter your lastname",
			email: {
				required: "Please enter a E-mail address",
				email: "Please enter a proper E-mail address",
			},
			subject: {
				required: " Please enter a subject",
				minlength: " Your username must consist of at least 5 characters",
			},
			message: {
				required: " Please enter a message",
				minlength: " Your message must consist of at least 10 characters",
			},
		},
	});
});

document.addEventListener("submit", e => {
	// Prevent the default form submit
	e.preventDefault();

	// Store reference to form to make later code easier to read
	const form = e.target;

	// get status message references
	const statusBusy = form.querySelector(".loader");
	const statusFailure = form.querySelector(".status-failure");

	// Post data using the Fetch API
	fetch(form.action, {
		method: form.method,
		body: new FormData(form),
	})
		// We turn the response into text as we expect HTML
		.then(res => res.text())

		// Let's turn it into an HTML document
		.then(text => new DOMParser().parseFromString(text, "text/html"))

		// Now we have a document to work with let's replace the <form>
		.then(doc => {
			// Create result message container and copy HTML from doc
			const result = document.createElement("div");
			result.innerHTML = doc.body.innerHTML;

			// Allow focussing this element with JavaScript
			result.tabIndex = -1;
			statusBusy.hidden = true;
			document.getElementById("enquiryForm").reset();
			alert("Request submitted successfully.");

			// And replace the form with the response children
			// form.parentNode.replaceChild(result, form);

			// Move focus to the status message
			// result.focus();
		})
		.catch(err => {
			// Unlock form elements
			Array.from(form.elements).forEach(field => (field.disabled = false));

			// Return focus to active element
			lastActive.focus();

			// Hide the busy state
			statusBusy.hidden = false;

			// Show error message
			statusFailure.hidden = false;
		});

	// Before we disable all the fields, remember the last active field
	const lastActive = document.activeElement;

	// Show busy state and move focus to it
	statusBusy.hidden = false;
	statusBusy.tabIndex = -1;
	statusBusy.focus();

	// Disable all form elements to prevent further input
	Array.from(form.elements).forEach(field => (field.disabled = true));

	// Make sure connection failure message is hidden
	statusFailure.hidden = true;
});
