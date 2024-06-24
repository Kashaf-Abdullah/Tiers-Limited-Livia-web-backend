const MeetingSchedule = require('../models/MeetingSchedule');
const calenderformsubmit = async (req, res) => {
    try {
      const { date, time, firma, vorname, email, anrede, nachname, telefon, ziel } = req.body;
  
    
  
      if (!date || !time) {
        return res.status(400).json({ message: 'Date and time are required' });
      }
       // Convert date string to Date object
    const formattedDate = new Date(date);


      const schedule = new MeetingSchedule({
        date: formattedDate,
        time,
        firma,
        vorname,
        email,
        anrede,
        nachname,
        telefon,
        ziel
      });
  
      await schedule.save();
      res.status(201).json(schedule);
    } catch (error) {

      res.status(500).json({ message: 'Error saving form data', error });
    }
  };

  const getAllSchedules = async (req, res) => {
    try {
      const schedules = await MeetingSchedule.find();
  
      // Format dates before sending response
      const formattedSchedules = schedules.map(schedule => {
        return {
          ...schedule._doc,
          date: schedule.date.toLocaleDateString() // Convert date to local date string
        };
      });
  
      res.status(200).json(formattedSchedules);
    } catch (error) {
     
      res.status(500).json({ message: 'Error retrieving schedules', error });
    }
  };
  
  
  module.exports = {
    calenderformsubmit,
    getAllSchedules
  };