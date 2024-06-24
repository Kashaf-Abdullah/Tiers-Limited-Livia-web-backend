
require('dotenv').config();
const nodemailer = require('nodemailer');
const sendContactForm= async (req, res) => {
    try {
        const { company_name, user_name, salutation, user_email, message } = req.body;

        // Configure transporter with your SMTP settings
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // SMTP server hostname
            port: 587, // Port for secure SMTP (TLS)
            secure: false, // Use TLS (true for 465, false for other ports)
            auth: {
              user: process.env.USER, // Your email address
              pass: process.env.EMAIL_PASS, // Your email password or app password
            },
          });

        // Construct the email message
        const mailOptions = {
            from: 'sender@example.com',
            to: process.env.USER,
            subject: 'New Contact Form Submission',
            html: `
                <p><strong>Company Name:</strong> ${company_name}</p>
                <p><strong>User Name:</strong> ${user_name}</p>
                <p><strong>Salutation:</strong> ${salutation}</p>
                <p><strong>User Email:</strong> ${user_email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    }catch (error) {
         res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {sendContactForm};