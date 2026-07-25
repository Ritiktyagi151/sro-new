const mongoose = require("mongoose");

const PartnerCMSSchema = new mongoose.Schema(
  {
    badge: { type: String, default: "Trusted Partnership" },
    title: { type: String, default: "Our Client" },
    description: { type: String, default: "We're proud to work with industry-leading companies who trust us to deliver exceptional results and drive their success forward." },
    happyClientsCount: { type: String, default: "12+" },
    satisfactionRate: { type: String, default: "98%" },
    averageRating: { type: String, default: "5.0 Average Rating" },
    clients: [
      {
        name: { type: String, required: true },
        logo: { type: String, required: false, default: "" },
        image: { type: String, required: false, default: "" },
        color: { type: String, default: "from-gray-500 to-gray-600" },
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("PartnerCMS", PartnerCMSSchema);
