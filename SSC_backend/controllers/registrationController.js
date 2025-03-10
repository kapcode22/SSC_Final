const getModel = require('../models/registrationModel'); // Ensure path is correct

exports.addRegistration = async (req, res) => {
  const { club, event } = req.params;
  const { name, email, phone, branch } = req.body;

  try {
    const student = getModel(club, event);
    const existingRegistration = await student.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({ error: 'Registration with this email already exists' });
    }
    const newRegistration = new student({ name, email, phone, branch, club, event });
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (err) {
    console.error("Error registering:", err);
    res.status(500).json({ error: 'Server error' });
  }
};
