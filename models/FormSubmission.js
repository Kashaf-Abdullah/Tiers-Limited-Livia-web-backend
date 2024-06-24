// models/FormSubmission.js

const mongoose = require('mongoose');

// Define the schema for form submissions
const formSubmissionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  firma: {
    type: String,

  },
  vorname: {
    type: String,
  
  },
  email: {
    type: String,
    required: true
  },
  anrede: {
    type: String
  },
  nachname: {
    type: String,
  
  },
  telefon: {
    type: String
  },
  ziel: {
    type: String
  }
});

// Create a model based on the schema
const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports = FormSubmission;
