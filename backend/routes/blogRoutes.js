const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.post(
  "/",
  protect,
  authorize("blogs", "write"),
  upload.single("image"),
  createBlog
);
router.put(
  "/:id",
  protect,
  authorize("blogs", "write"),
  upload.single("image"),
  updateBlog
);
router.delete("/:id", protect, authorize("blogs", "delete"), deleteBlog);

module.exports = router;
