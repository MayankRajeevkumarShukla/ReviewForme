const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/erroHandler");
dotenv.config();
console.log("MongoDB URL:", process.env.MONGO_URL);

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({origin: 'http://localhost:5173'}));
app.use(morgan("dev")); // Log HTTP requests
app.use(helmet()); // Add security headers

const mongoURI = process.env.MONGO_URL;
if (!mongoURI) {
    console.error("Error: MongoDB URL is not defined in environment variables");
    process.exit(1); 
}
mongoose.connect(mongoURI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error in connecting to MongoDB:", err));
app.get("/", (req, res) => {
    res.send("API is running");
});
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
module.exports = app;
