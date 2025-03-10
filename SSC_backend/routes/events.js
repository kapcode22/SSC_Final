const express = require('express');
const multer = require('multer');
const path = require('path');
const eventsController = require('../controllers/eventsController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/:club', eventsController.verifyToken, upload.single('image'), eventsController.addEvent);
router.get('/:club', eventsController.getEventsByClub);
router.delete('/:club/:id', eventsController.deleteEvent);
module.exports = router;
