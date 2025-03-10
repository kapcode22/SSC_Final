const { getEventModel } = require('../models/dynamicModel');
const jwt = require('jsonwebtoken');


// authentiction of admin
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

// if done successfully then admin subadmin can add events 

const addEvent = async (req, res) => {
    const { club } = req.params;
    const { title, desc } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        const Event = getEventModel(club);

        const newEvent = new Event({
            title, desc, image
        });

        await newEvent.save();
        res.status(201).send(newEvent);
    } catch (err) {
        console.error('Error saving Event:', err);  // Log the error
        res.status(500).send({ message: 'Error saving in Event ', error: err.message });
    }
};


// getting addedd events on frontend

const getEventsByClub = async (req, res) => {
    const { club } = req.params;

    try {
        const Event = getEventModel(club);
        const Events = await Event.find();
        res.status(200).send(Events);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).send({ message: 'Error fetching events', error: err.message });
    }
};
const deleteEvent = async (req, res) => {
    const { club, id } = req.params;

    try {
        const Event = getEventModel(club); // Get the specific model for the club
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
};
module.exports = {
    addEvent,
    getEventsByClub,
    verifyToken,
    deleteEvent
};
