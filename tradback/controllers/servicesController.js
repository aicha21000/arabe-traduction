// controllers/servicesController.js
const AdditionalService = require('../models/AdditionalService');

// Controller to get all additional services
exports.getAllAdditionalServices = async (req, res) => {
  try {
    const additionalServices = await AdditionalService.find();
    res.status(200).json(additionalServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to add a new additional service
exports.addAdditionalService = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newService = new AdditionalService({ name, description, price });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add more controllers related to additional services as needed
