// controllers/translationController.js
const Order = require('../models/Order');
const path = require('path');

exports.requestTranslation = async (req, res) => {
  try {
    console.log('Handling translation request...');

    const { userId } = req.user;
    const { languageSource, languageTarget, additionalMessage } = req.body;


    const documentPath = req.file.path;
    const newOrder = new Order({
      user: userId,
      languageSource,
      languageTarget,
      document: documentPath,
      additionalMessage,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Translation request error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllTranslationServices = async (req, res) => {
  try {
    const translationServices = [
      { name: 'Page Translation', description: 'Translation of a single page document' },
      { name: 'Document Translation', description: 'Translation of longer documents' },
    ];
    res.status(200).json(translationServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};