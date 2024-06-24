const express = require('express');
const { calenderformsubmit , getAllSchedules} = require('../controllers/schedulemeetingController');

const router = express.Router();

router.post('/schedulemeeting',calenderformsubmit );
router.get('/schedulemeeting', getAllSchedules);

module.exports = router;
