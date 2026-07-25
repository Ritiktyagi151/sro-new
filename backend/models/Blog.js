const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "General",
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
    metaKeywords: {
      type: String,
      default: "",
    },
    canonicalUrl: {
      type: String,
      default: "",
    },
    author: {
      name: { type: String, default: "Admin" },
      role: { type: String, default: "Author" },
      avatar: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
