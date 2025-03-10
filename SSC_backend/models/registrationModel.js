const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique: true},
  phone: { type: String, required: true },
  branch: { type: String, required: true },
  club: { type: String, required: true },
  event: { type: String, required: true },
});

const getModel = (club, event) => {
  const modelName = `${club}_${event}_registrations`.replace(/\s+/g, '_').toLowerCase();
  return mongoose.model(modelName, registrationSchema, modelName);
};

module.exports = getModel;
