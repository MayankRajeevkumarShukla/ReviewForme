const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true, index: true },
    password: { type: String, required: true, minlength: 6 },  // Hash this before saving
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    createdAt: { type: Date, default: Date.now }
});

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },  // Hash this before saving
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    orgURL: { type: String, unique: true },
    slug: { type: String, unique: true },
    logo: { type: String },  // URL for the organization logo
    theme: { type: String, default: 'default' },  // Light/Dark mode or themes
    createdAt: { type: Date, default: Date.now }
});

const feedbackSchema = new mongoose.Schema({
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    submitterName: { type: String },
    submitterEmail: { type: String },
    media: [{ type: String }],  // URLs of images/videos
    isPublic: { type: Boolean, default: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Organization = mongoose.model('Organization', organizationSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = { User, Organization, Feedback };
