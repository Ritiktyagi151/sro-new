const nodemailer = require("nodemailer");

const sendEmail = async ({ subject, text, html }) => {
  const smtpHost = process.env.SMTP_HOST || "smtp.office365.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER || "info@srobearings.com";
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpPass) {
    console.log("=========================================");
    console.log("SMTP Password (SMTP_PASS) not configured. Logging Email to console:");
    console.log(`To: info@srobearings.com`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${text}`);
    console.log("=========================================");
    return true;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"SRO Website Enquiry" <${smtpUser}>`,
    to: "info@srobearings.com",
    subject: subject,
    text: text,
    html: html
  };

  await transporter.sendMail(mailOptions);
  return true;
};

module.exports = sendEmail;
