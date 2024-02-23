// controllers/complaintsController.js
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { Complaint, Reply } = require('../model/LoginSignup');

const getComplaints = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // get the page number from query params or set it to 1 if it's not provided
        const limit = parseInt(req.query.limit) || 10; // get the number of records per page from query params or set it to 10 if it's not provided
        const skipIndex = (page - 1) * limit; // calculate the index from which to start skipping records

        const complaints = await Complaint.find().limit(limit).skip(skipIndex);
        res.status(200).json({
            complaintsdata: complaints,
            totalPages: Math.ceil(await Complaint.countDocuments() / limit), // calculate the total number of pages
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error getting complaints' });
    }
};

const createComplaint = async (req, res) => {
    try {
        const { email, description,subject } = req.body;
        const randomNumber = Math.floor(Math.random() * 99999);
        const complaint = new Complaint({ email, description, ticketnumber: randomNumber ,subject});
        await complaint.save();
        res.status(201).json({ complaint, message: "Created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating complaint' });
    }
};

const replyComplaint = async (req, res) => {
    try {
        const { email, description, status, ticketnumber } = req.body;

        // Find the corresponding complaint
        const complaint = await Complaint.findOne({ email });

        // If complaint not found, handle the error
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        // Push the new reply into the replies array of the complaint
        complaint.replies.push({ email, description, status, ticketnumber });

        // Save the updated complaint document
        await complaint.save();

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const TicketTemplatepath = path.join(__dirname, 'ticket.html');
        let TicketTemplate = fs.readFileSync(TicketTemplatepath, 'utf-8');

        TicketTemplate = TicketTemplate.replace('{{description}}', description);

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Ticket Reply from CRM tool',
            html: TicketTemplate,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ reply, message: 'Created' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating reply' });
    }
};

module.exports = {
    getComplaints, createComplaint, replyComplaint
}