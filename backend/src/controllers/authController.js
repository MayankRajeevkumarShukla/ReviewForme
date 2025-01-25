const jwt = require("jsonwebtoken");
const { User, Organization, Feedback } = require("../models/User");
const bcrypt = require("bcryptjs");
require('dotenv').config();
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
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const jwtSecret = process.env.JWT_SECRET || 'mayank123';
    const token = jwt.sign({ userId: user._id,email:user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.logout = async (req, res) => {
  res.json({
    message: "Logged out successfully. Remove the token on client side.",
  });
};
exports.sendFeedback = async(req,res)=>{
  const {content,rating,organization,submitterName,submitterEmail,media,isPublic,status,date} = req.body
  try {
    if(!content||!rating||!organization||!submitterName||!submitterEmail||!status||!date) res.send("the above field is required");
      const feedback = new Feedback({content,rating,organization,submitterName,submitterEmail,media,isPublic,status,date})
     await feedback.save()
     res.status(201).json({message:"Feedback sent succesfully"})
    } catch (error) {
    res.status(500).json({message:"Server issue"})
  }
}
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
   const {organizationID} = req.params
   const {organization}= await Organization.findById(organizationID)
   if(!organization) return res.status(404).json({ message: "Organization not found" }); 
   if(!organization.user.includes(req.user.userId)){
    return res.status(403).json({ message: "Access denied" });
   }
   const feedback = await Feedback.find({ organization: organizationID });
    res.json(feedback);
 } catch (error) {
  res.status(500).json({message:"Server error",error})
 }
};



