const express = require("express");
const router = express.Router();
const {
  getAboutUs,
  updateAboutUs,
  getContactInfo,
  updateContactInfo,
  getAllGallery,
  createGallery,
  deleteGallery,
  getAllServices,
  createService,
  updateService,
  deleteService,
  getAllIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  getPartnerCMS,
  updatePartnerCMS,
} = require("../controllers/cmsController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public endpoints
router.get("/about", getAboutUs);
router.get("/contact", getContactInfo);
router.get("/gallery", getAllGallery);
router.get("/services", getAllServices);
router.get("/industries", getAllIndustries);
router.get("/partners", getPartnerCMS);

// Secure endpoints
router.put("/about", protect, authorize("settings", "write"), updateAboutUs);
router.put("/contact", protect, authorize("settings", "write"), updateContactInfo);
router.put("/partners", protect, authorize("settings", "write"), updatePartnerCMS);

router.post(
  "/gallery",
  protect,
  authorize("settings", "write"),
  upload.single("image"),
  createGallery
);
router.delete(
  "/gallery/:id",
  protect,
  authorize("settings", "delete"),
  deleteGallery
);

router.post(
  "/services",
  protect,
  authorize("settings", "write"),
  upload.single("image"),
  createService
);
router.put(
  "/services/:id",
  protect,
  authorize("settings", "write"),
  upload.single("image"),
  updateService
);
router.delete(
  "/services/:id",
  protect,
  authorize("settings", "delete"),
  deleteService
);

router.post(
  "/industries",
  protect,
  authorize("settings", "write"),
  upload.single("image"),
  createIndustry
);
router.put(
  "/industries/:id",
  protect,
  authorize("settings", "write"),
  upload.single("image"),
  updateIndustry
);
router.delete(
  "/industries/:id",
  protect,
  authorize("settings", "delete"),
  deleteIndustry
);

module.exports = router;
