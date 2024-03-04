// controllers/translationController.js
const Order = require('../models/Order');
const path = require('path');
const nodemailer = require('nodemailer');
const User = require('../models/User');

exports.requestTranslation = async (req, res) => {
  try {
    console.log('Handling translation request...');

    const { userId } = req.user;
    const { languageSource, languageTarget, additionalMessage, numberOfPages, deliveryTime, deliveryMethod } = req.body;

    let additionalPrice = 0;

    if (deliveryTime === 'urgent_48h') {
      additionalPrice = 10;
    } else if (deliveryTime === 'very_urgent_24h') {
      additionalPrice = 20;
    }

    if (deliveryMethod === 'postal') {
      additionalPrice += 10;
    }

    const basePricePerPage = 25;

    const totalPrice = (numberOfPages * basePricePerPage) + additionalPrice;

    const documentPath = req.file.path;

    const newOrder = new Order({
      user: userId,
      languageSource,
      languageTarget,
      document: documentPath,
      additionalMessage,
      numberOfPages,
      deliveryTime,
      deliveryMethod,
      price: totalPrice,
    });

    // Enregistrer la nouvelle commande
    const savedOrder = await newOrder.save();

    // Envoyer un e-mail de confirmation
    await sendConfirmationEmail(userId, savedOrder._id, savedOrder);

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

const sendConfirmationEmail = async (userId, orderId, orderDetails) => {
  try {
    const user = await User.findById(userId);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const orderText = `
    Thank you for your translation request!
    
    Your order ID is ${orderId}.
    
    Order Details:
    - Language Source: ${orderDetails.languageSource}
    - Language Target: ${orderDetails.languageTarget}
    - Document Name: ${path.basename(orderDetails.document)}
    - Additional Message: ${orderDetails.additionalMessage || 'N/A'}
    - Number of Pages: ${orderDetails.numberOfPages}
    - Price: ${orderDetails.price} Euros
    - Delivery Time: ${orderDetails.deliveryTime}
    - Delivery Method: ${orderDetails.deliveryMethod}
    - Order Date: ${orderDetails.createdAt.toLocaleString()}
    `;


    const mailOptions = {
      from: 'rachi69003@gmail.com',
      to: [user.email, 'rachi69003@gmail.com'],
      subject: 'Translation Request Confirmation',
      text: orderText,
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully!');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
