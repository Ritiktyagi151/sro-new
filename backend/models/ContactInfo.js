const mongoose = require("mongoose");

const ContactInfoSchema = new mongoose.Schema(
  {
    phone1: { type: String, default: "" },
    phone2: { type: String, default: "" },
    email: { type: String, default: "" },
    email2: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    address: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);
