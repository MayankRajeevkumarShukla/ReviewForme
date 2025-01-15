const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{type:String,require:true,trim:true},
    password:{type:String,require:true,minlength:6},
    email:{type:String,require:true,unique:true,lowercase:true},
    createdAt:{ type: Date, default: Date.now }
})
const organizationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

})

const feedbackSchema = new mongoose.Schema({
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    submitterName: { type: String },
    submitterEmail: { type: String },
    date: { type: Date, default: Date.now }
})
const User = mongoose.model('User',userSchema)
const Organization = mongoose.model('Organization', organizationSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports={User, Organization, Feedback }