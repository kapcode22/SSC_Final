const express = require('express');
const multer = require('multer');
const path = require('path');
const postHoldersController = require('../controllers/postHoldersController');
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

router.post('/:club', postHoldersController.verifyToken, upload.single('image'), postHoldersController.addPostHolder);
router.get('/:club',  postHoldersController.getPostHoldersByClub);
router.delete('/:club/:id', postHoldersController.deletePostHolder);
module.exports = router;
