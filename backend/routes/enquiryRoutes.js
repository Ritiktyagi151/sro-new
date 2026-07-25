const express = require("express");
const router = express.Router();
const {
  submitEnquiry,
  getContactEnquiries,
  getWebsiteEnquiries,
  markAsRead,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const { protect, authorize } = require("../middleware/auth");

router.post("/", submitEnquiry);
router.get(
  "/contact",
  protect,
  authorize("enquiries", "read"),
  getContactEnquiries
);
router.get(
  "/website",
  protect,
  authorize("enquiries", "read"),
  getWebsiteEnquiries
);
router.put("/:id/read", protect, authorize("enquiries", "write"), markAsRead);
router.delete("/:id", protect, authorize("enquiries", "delete"), deleteEnquiry);

module.exports = router;
