const mongoose = require('mongoose');

const postHolderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    post: { type: String, required: true },
    instaLink: { type: String },
    facebookLink: { type: String },
    linkdinLink: { type: String },
    image: { type: String },
});

const sliderImageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }
});

const eventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String },
});
const getModel = (collectionName, schema) => {
    return mongoose.model(collectionName, schema, collectionName);
};

module.exports = {
    getPostHolderModel: (club) => getModel(`${club}_postHolders`, postHolderSchema),
    getSliderImageModel: (club) => getModel(`${club}_sliderImages`, sliderImageSchema),
    getEventModel:(club)=> getModel(`${club}_events`,eventsSchema)
};
