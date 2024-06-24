require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/images', express.static('images'));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
});

const authRoute = require('./routes/authRoute');
app.use('/api', authRoute);

const userRouter = require('./routes/media');
app.use('/media', userRouter);

const scheduleRouter = require('./routes/scheduleRoute');
app.use('/api', scheduleRouter);
const ScheduleMeeting=require('./routes/scheduleMeetingRoute')
app.use('/api',ScheduleMeeting)

const formRoute = require('./routes/formRoute');
app.use('/api', formRoute);

const contactformRoute=require('./routes/contactformRoute')
app.use('/api',contactformRoute)
app.listen(3001, () => {
});



