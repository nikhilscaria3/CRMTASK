const { Dialer } = require("../model/LoginSignup");
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

const dialeremail = async (req, res) => {
    try {
        const { email, subject, message } = req.body;
        console.log(email, subject, message);
        // Find the corresponding complaint

        const savedDialermail = new Dialer({ email, subject, message });
        await savedDialermail.save();
        

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const emailAddress = email.split('@')[0];

        const TicketTemplatepath = path.join(__dirname, 'ticket.html');
        let TicketTemplate = fs.readFileSync(TicketTemplatepath, 'utf-8');

        TicketTemplate = TicketTemplate.replace('{{description}}', message)
            .replace('{{email}}', emailAddress);

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            html: TicketTemplate,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Created' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating reply' });
    }
};

module.exports = { dialeremail };
