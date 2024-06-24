const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Media = require('../models/MediaPost');

const auth=require('../middlewares/authMiddleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.route('/add').post(upload.single('photo'), (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request File:", req.file);

        const { heading, description, link } = req.body;
        const photo = req.file ? req.file.filename : null;

        const newMediaData = {
            heading,
            description,
            link,
            photo,
        };

        // console.log("New Media Data:", newMediaData);

        const newMedia = new Media(newMediaData);

        newMedia.save()
            .then(() => res.json('Media Added'))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route('/allpost').get(async (req, res) => {
    try {
        const allMedia = await Media.find({});
        res.status(200).json({
            status: 'Success',
            data: {
                allMedia,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Delete a media post
router.route('/delete/:id').delete((req, res) => {
    Media.findByIdAndDelete(req.params.id)
        .then(() => res.json('Media post deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});




// Update a media post
router.route('/update/:id').put(upload.single('photo'), async (req, res) => {
    try {
        const { heading, description, link } = req.body;
        let photo = req.file ? req.file.filename : null;

        // Fetch the media post by ID
        let mediaPost = await Media.findById(req.params.id);

        if (!mediaPost) {
            return res.status(404).json({ error: 'Media post not found' });
        }

        // Update the fields if provided
        mediaPost.heading = heading || mediaPost.heading;
        mediaPost.description = description || mediaPost.description;
        mediaPost.link = link || mediaPost.link;

        // Update the photo if provided
        if (photo) {
            mediaPost.photo = photo;
        }

        // Save the updated media post
        await mediaPost.save();
        res.status(200).json({ status: 'Success', message: 'Media post updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;