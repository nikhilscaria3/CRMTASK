const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    email: { type: String },
    password: { type: String },
    type: { type: String },
    name: { type: String, },
    size: { type: String, },
    location: { type: String, },
    industry: { type: String, },
    website: { type: String },
    description: { type: String },
    logo: { type: String },
})

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber:
    {
        type: String,
        required: true
    }
    ,
    emailAddress:
    {
        type: String,
        required: true
    }
    ,
    companyName: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    location:
    {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    projectcost: {
        type: Number,
        required: true
    }
});


const employeeSchema = new mongoose.Schema({
    employeename: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber:
    {
        type: Number,
        required: true
    }
    ,
    emailAddress:
    {
        type: String,
        required: true
    }
    ,
    companyName: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    workmode: {
        type: String,
        required: true
    },
    salary:
    {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required:true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    }

});

const DialerSchema = new mongoose.Schema({
    email: { type: String },
    subject: { type: String },
    message: { type: String }
})

const ComplaintSchema = new mongoose.Schema({
    // Your existing fields for the Complaint model
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Ticket Created",
    },
    ticketnumber: {
        type: Number,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    replies: [
        {
            email: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                enum: ['Ticket Checked', 'Ticket On-Progress', 'Ticket Denied', 'Ticket Resolved'],
                default: 'Ticket Checked', // Set the default status to a valid enum value
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});


const Employee = mongoose.model('Employee', employeeSchema);
const Complaint = mongoose.model('Complaint', ComplaintSchema);
const Dialer = mongoose.model("Dialer", DialerSchema)
const Customer = mongoose.model('Customer', customerSchema);
const User = mongoose.model("User", UserSchema)

module.exports = { User, Customer, Complaint, Employee, Dialer };