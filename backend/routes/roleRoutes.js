const express = require("express");
const router = express.Router();
const {
  getRoles,
  updateRolePermissions,
  getAdminUsers,
  createAdminUser,
  deleteAdminUser,
} = require("../controllers/roleController");
const { protect, authorize } = require("../middleware/auth");

router.get("/roles", protect, authorize("settings", "read"), getRoles);
router.put("/roles/:id", protect, authorize("settings", "write"), updateRolePermissions);

router.get("/users", protect, authorize("settings", "read"), getAdminUsers);
router.post("/users", protect, authorize("settings", "write"), createAdminUser);
router.delete("/users/:id", protect, authorize("settings", "delete"), deleteAdminUser);

module.exports = router;
