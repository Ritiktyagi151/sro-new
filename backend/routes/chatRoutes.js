const express = require("express");
const router = express.Router();
const { sendChatMessage } = require("../controllers/chatController");
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), sendChatMessage);

module.exports = router;
