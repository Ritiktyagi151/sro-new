const Enquiry = require("../models/Enquiry");
const sendEmail = require("../utils/sendEmail");

const submitEnquiry = async (req, res) => {
  const { formType, name, email, phone, address, message } = req.body;
  try {
    const enquiry = await Enquiry.create({
      formType: formType || "general_website",
      name,
      email,
      phone,
      address: address || "",
      message,
    });

    // Send email notification
    const typeLabel = formType === "contact" ? "Contact Page Form Submission" : "General Website Enquiry";
    const emailSubject = `New SRO Enquiry: ${typeLabel} from ${name}`;
    const emailText = `
You have received a new enquiry on the SRO Bearings website:

Type: ${typeLabel}
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Address: ${address || "N/A"}

Message:
${message}
    `;

    const emailHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #15803d; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-top: 0;">New Website Enquiry</h2>
        <p>A visitor has submitted the enquiry form on your website. Details are listed below:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb; width: 120px;">Form Type</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${typeLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Name</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Email</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Phone</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold; background: #f9fafb;">Address</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${address || "N/A"}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px; border-left: 4px solid #15803d;">
          <h4 style="margin: 0 0 8px 0; color: #111827;">User Message:</h4>
          <p style="margin: 0; white-space: pre-wrap; font-style: italic;">"${message}"</p>
        </div>
      </div>
    `;

    // Trigger asynchronously so it doesn't block response
    sendEmail({
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    }).catch((err) => console.error("Error sending notification email:", err));

    res.status(201).json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getContactEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ formType: "contact" }).sort({
      createdAt: -1,
    });
    res.json({ success: true, enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWebsiteEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ formType: "general_website" }).sort({
      createdAt: -1,
    });
    res.json({ success: true, enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry)
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    enquiry.status = "read";
    await enquiry.save();
    res.json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry)
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    await enquiry.deleteOne();
    res.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitEnquiry,
  getContactEnquiries,
  getWebsiteEnquiries,
  markAsRead,
  deleteEnquiry,
};
