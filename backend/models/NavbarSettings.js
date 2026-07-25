const mongoose = require("mongoose");

const NavbarSettingsSchema = new mongoose.Schema(
  {
    dropdowns: [
      {
        id: { type: String, required: true }, // e.g., "by-industry", "by-material"
        title: { type: String, required: true },
        displayMode: {
          type: String,
          enum: ["category", "product"],
          default: "category",
        },
        enabled: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
        items: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("NavbarSettings", NavbarSettingsSchema);
