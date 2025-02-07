const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/sendFeedback", authController.sendFeedback);
router.get("/profile", authMiddleware, authController.getProfile);
router.get("/feedbacks", authMiddleware, authController.getFeedback);
router.post("/create", authMiddleware, authController.createOrganization);
router.get("/organization/:id", authMiddleware, authController.getOrganization);

module.exports = router;
