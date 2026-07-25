const express = require("express");
const router = express.Router();
const {
  getNavbarSettings,
  updateNavbarSettings,
} = require("../controllers/navbarController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", getNavbarSettings);
router.put("/", protect, authorize("navbar", "write"), updateNavbarSettings);

module.exports = router;
