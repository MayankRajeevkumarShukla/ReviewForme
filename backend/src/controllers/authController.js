const jwt = require("jsonwebtoken");
const { User, Organization, Feedback } = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashPassword, username });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET is missing from environment");

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createOrganization = async (req, res) => {
  const { name, users, orgURL, slug, logo, theme } = req.body;

  try {
    if (!name || !users || !orgURL || !slug || !logo || !theme)
      return res.status(400).json({ message: "All fields are required" });

    const newOrganization = new Organization({
      name,
      users,
      orgURL,
      slug,
      logo,
      theme,
    });
    await newOrganization.save();

    res.status(201).json({ message: "Organization created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.logout = async (req, res) => {
  res.json({
    message: "Logged out successfully. Remove the token on client side.",
  });
};

exports.getOrganization = async (req, res) => {
  const { id } = req.params;

  try {
    const organization = await Organization.findById(id).populate(
      "users",
      "email username"
    );
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.json({ success: true, organization });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.sendFeedback = async (req, res) => {
  const {
    content,
    rating,
    organization,
    submitterName,
    submitterEmail,
    media,
    isPublic,
    status,
    date,
  } = req.body;

  try {
    if (
      !content ||
      !rating ||
      !organization ||
      !submitterName ||
      !submitterEmail ||
      !status ||
      !date
    )
      return res.status(400).json({ message: "All fields are required" });

    const feedback = new Feedback({
      content,
      rating,
      organization,
      submitterName,
      submitterEmail,
      media,
      isPublic,
      status,
      date,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server issue", error });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const { organizationID } = req.query;
    const organization = await Organization.findById(organizationID);

    if (!organization)
      return res.status(404).json({ message: "Organization not found" });

    if (!organization.users.includes(req.user.userId)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const feedback = await Feedback.find({ organization: organizationID });
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
