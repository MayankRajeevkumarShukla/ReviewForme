const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Define routes correctly
router.post("/signup", authController.signup); // Signup route
router.post("/login", authController.login);   // Login route
router.post("/logout", authController.logout); // Logout route
router.get("/profile", authMiddleware, authController.getProfile); // Protected profile route

module.exports = router; // Export the router
