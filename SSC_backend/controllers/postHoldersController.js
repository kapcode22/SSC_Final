const { getPostHolderModel } = require('../models/dynamicModel');
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

const addPostHolder = async (req, res) => {
    const { club } = req.params;
    const { name, post, instaLink, facebookLink, linkdinLink } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        const PostHolder = getPostHolderModel(club);

        const newPostHolder = new PostHolder({
            name,
            post,
            instaLink,
            facebookLink,
            linkdinLink,
            image
        });

        await newPostHolder.save();
        res.status(201).send(newPostHolder);
    } catch (err) {
        console.error('Error saving post holder:', err);  // Log the error
        res.status(500).send({ message: 'Error saving post holder', error: err.message });
    }
};

const getPostHoldersByClub = async (req, res) => {
    const { club } = req.params;
    
    try {
        const PostHolder = getPostHolderModel(club);
        const postHolders = await PostHolder.find();
        res.status(200).send(postHolders);
    } catch (err) {
        console.error('Error fetching post holders:', err);
        res.status(500).send({ message: 'Error fetching post holders', error: err.message });
    }
};

const deletePostHolder = async (req, res) => {
    const { club, id } = req.params;

    try {
        const PostHolder = getPostHolderModel(club); // Get the specific model for the club
        const deletedPostHolder = await PostHolder.findByIdAndDelete(id);

        if (!deletedPostHolder) {
            return res.status(404).json({ message: 'Post holder not found' });
        }

        res.status(200).json({ message: 'Post holder deleted successfully' });
    } catch (err) {
        console.error('Error deleting post holder:', err);
        res.status(500).json({ message: 'Error deleting post holder', error: err.message });
    }
};

module.exports = {
    addPostHolder,
    verifyToken,
    getPostHoldersByClub,
    deletePostHolder
};
