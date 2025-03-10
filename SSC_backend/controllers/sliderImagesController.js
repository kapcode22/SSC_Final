const { getSliderImageModel } = require('../models/dynamicModel');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, 'SSC_123', (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

const addSliderImage = async (req, res) => {
    const { club } = req.params;
    const imageUrl = req.file ? req.file.path : '';

    try {
        const SliderImage = getSliderImageModel(club);

        const newSliderImage = new SliderImage({
            imageUrl
        });

        await newSliderImage.save();
        res.status(201).send(newSliderImage);
    } catch (err) {
        console.error('Error uploading slider image:', err);
        res.status(500).send({ message: 'Error uploading slider image', error: err.message });
    }
};

const getSliderImagesByClub = async (req, res) => {
    const { club } = req.params;

    try {
        const SliderImage = getSliderImageModel(club);
        const sliderImages = await SliderImage.find();
        res.status(200).send(sliderImages);
    } catch (err) {
        console.error('Error fetching slider images:', err);
        res.status(500).send({ message: 'Error fetching slider images', error: err.message });
    }
};

const deleteSliderImage = async (req, res) => {
    const { club, id } = req.params;

    try {
        const SliderImage = getSliderImageModel(club); // Get the specific model for the club
        const deletedImage = await SliderImage.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
        console.error('Error deleting slider image:', err);
        res.status(500).json({ message: 'Error deleting slider image', error: err.message });
    }
};


module.exports = {
    addSliderImage,
    verifyToken,
    getSliderImagesByClub,
    deleteSliderImage,

};
