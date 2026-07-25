const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema(
  {
    greetingsTitle: {
      type: String,
      default: "Driving a Greener Future",
    },
    greetingsContent: {
      type: String,
      default: "",
    },
    chairmanMessage: {
      name: { type: String, default: "" },
      role: { type: String, default: "" },
      quote: { type: String, default: "" },
      avatar: { type: String, default: "" },
    },
    mdMessage: {
      name: { type: String, default: "" },
      role: { type: String, default: "" },
      quote: { type: String, default: "" },
      avatar: { type: String, default: "" },
    },
    establishedYear: {
      type: String,
      default: "",
    },
    sqFtArea: {
      type: String,
      default: "",
    },
    legacyYearsCount: {
      type: String,
      default: "",
    },
    timelineMilestones: [
      {
        year: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
    stats: [
      {
        number: { type: String },
        label: { type: String },
        prefix: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutUs", AboutUsSchema);
