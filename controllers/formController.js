require('dotenv').config();
const nodemailer = require('nodemailer');
const FormSubmission = require('../models/FormSubmission');
const submitForm = async (req, res) => {
  try {
    const formData = req.body;
    // Save the form data to your database
    const savedFormData = await FormSubmission.create(formData);
    // Send email notification
    await sendEmailNotification(formData);
    res.status(200).send({ message: 'Form data saved successfully!', savedFormData });
  } catch (error) {
   
    res.status(500).send({ error: 'Internal server error' });
  }
};
const sendEmailNotification = async (formData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP server hostname
      port: 587, // Port for secure SMTP (TLS)
      secure: false, // Use TLS (true for 465, false for other ports)
      auth: {
        user: process.env.USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

        // Parse the date string from the form data and format it as desired
        const date = new Date(formData.date);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    
        const message = {
          from: 'sender@example.com',
          to:process.env.USER,
          subject: 'New Form Submission',
          html: `
            <h1>New Form Submission</h1>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formData.time}</p>
            <p><strong>Firma:</strong> ${formData.firma}</p>
            <p><strong>Vorname:</strong> ${formData.vorname}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Anrede:</strong> ${formData.anrede}</p>
            <p><strong>Nachname:</strong> ${formData.nachname}</p>
            <p><strong>Telefon:</strong> ${formData.telefon}</p>
            <p><strong>Ziel:</strong> ${formData.ziel}</p>
          `,
        };

    const info = await transporter.sendMail(message);
  
  } catch (error) {
   
    throw error;
  }
};

module.exports = { submitForm };