const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Replace with your Gmail credentials and project-specific details
const gmailEmail = "smashraful.tech@gmail.com";
const gmailPassword = "smashraful2583";
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendWelcomeEmail = functions.firestore
  .document("employees/{employeeId}")
  .onCreate((snap) => {
    const employeeData = snap.data();

    const mailOptions = {
      from: gmailEmail,
      to: employeeData.email,
      subject: "Welcome to the team!",
      // ... customize your email content using employeeData
    };

    return mailTransport
      .sendMail(mailOptions)
      .then(() => console.log("Welcome email sent"))
      .catch((error) => console.error("Error sending email:", error));
  });
