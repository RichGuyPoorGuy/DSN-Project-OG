import 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3.11.0/dist/email.min.js';
emailjs.init('l0JwCTGcUa5TseeYh');
document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Log data to verify correctness
    console.log({ from_name: name, from_email: email, message });

    // Send email using EmailJS
    emailjs.send("service_jtvc5k7", "template_7gytrbs", {
        from_name: name,
        from_email: email,
        message: message,
    }).then(
        function () {
            alert("Feedback sent successfully!");
            document.getElementById('feedbackForm').reset(); // Reset the form
        },
        function (error) {
            alert("Failed to send feedback. Please try again later.");
            console.error("Error sending email:", error);
        }
    );
});
