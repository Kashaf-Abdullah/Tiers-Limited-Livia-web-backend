const express = require('express');
const { createSchedule, getSchedules, getSchedulesByDateAndTime, deleteSchedule, deleteScheduleTime, updateSchedule } = require('../controllers/scheduleController');

const router = express.Router();

router.post('/schedules', createSchedule);
router.get('/schedules', getSchedules);
router.get('/schedules/query', getSchedulesByDateAndTime); // Added route for querying by date and time
router.delete('/schedules/:id', deleteSchedule); // yahan add karein
router.delete('/schedules/:id/time/:time', deleteScheduleTime); // yahan add karein
router.put('/schedules/:id', updateSchedule); // Add this line

module.exports = router;
