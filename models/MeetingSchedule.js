const mongoose = require('mongoose');
const MeetingScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  firma: String,
  vorname: String,
  email: String,
  anrede: String,
  nachname: String,
  telefon:Number,
  ziel: String,
});
module.exports = mongoose.model('ScheduleMeeting', MeetingScheduleSchema);