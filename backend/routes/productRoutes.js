const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.post(
  "/",
  protect,
  authorize("products", "write"),
  upload.single("image"),
  createProduct
);
router.put(
  "/:id",
  protect,
  authorize("products", "write"),
  upload.single("image"),
  updateProduct
);
router.delete("/:id", protect, authorize("products", "delete"), deleteProduct);

module.exports = router;
