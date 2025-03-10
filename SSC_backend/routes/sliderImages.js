const express = require('express');
const multer = require('multer');
const path = require('path');
const sliderImageController = require('../controllers/sliderImagesController');
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

router.post('/:club', sliderImageController.verifyToken, upload.single('image'), sliderImageController.addSliderImage);
router.get('/:club',  sliderImageController.getSliderImagesByClub);
router.delete('/:club/:id', sliderImageController.deleteSliderImage);

module.exports = router;
