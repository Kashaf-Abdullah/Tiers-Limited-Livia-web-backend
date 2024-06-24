


const Schedule = require('../models/Schedule');

const createSchedule = async (req, res) => {
  try {
    const { date, times } = req.body;
    const schedule = new Schedule({ date, times });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error });
  }
};

const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving schedules', error });
  }
};
const getSchedulesByDateAndTime = async (req, res) => {
    try {
      const { date } = req.query;
      
      const schedules = await Schedule.findOne({ date });

      res.status(200).json(schedules);
    } catch (error) {
    
      res.status(500).json({ message: 'Error retrieving schedules', error });
    }
  };
  const getSchedulesByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const schedules = await Schedule.find({ date: new Date(date) });
        
        if (schedules.length > 0) {
            res.status(200).json(schedules[0].times); // Assuming only one schedule entry per date
        } else {
            res.status(404).json({ message: 'No schedules found for the specified date' });
        }
    } catch (error) {
      
        res.status(500).json({ message: 'Error retrieving schedules', error });
    }
};
const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (deletedSchedule) {
      res.status(200).json({ message: 'Schedule deleted successfully', deletedSchedule });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {

    res.status(500).json({ message: 'Error deleting schedule', error });
  }
};


const deleteScheduleTime = async (req, res) => {
  try {
    const { id, time } = req.params;
    const schedule = await Schedule.findById(id);
    if (schedule) {
      schedule.times = schedule.times.filter(t => t !== time);
      await schedule.save();
      res.status(200).json({ message: 'Time deleted successfully', schedule });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
     res.status(500).json({ message: 'Error deleting time', error });
  }
};



const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, times } = req.body;
    const schedule = await Schedule.findById(id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    schedule.date = date;
    schedule.times = times;

    await schedule.save();
    res.status(200).json({ message: 'Schedule updated successfully', schedule });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ message: 'Error updating schedule', error });
  }
};

module.exports = {
  createSchedule,
  getSchedules,
  getSchedulesByDateAndTime,
  getSchedulesByDate,
  deleteSchedule,
  deleteScheduleTime,
  updateSchedule
};














