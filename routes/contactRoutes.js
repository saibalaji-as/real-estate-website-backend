const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, address, city, state, country, zipCode, property } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            address,
            city,
            state,
            country,
            zipCode,
            property
        });

        const savedContact = await newContact.save();
        res.status(201).json({
            message: 'Contact saved successfully!',
            contact: savedContact
        });
    } catch (error) {
        console.log('Error saving contact:', error);
        res.status(500).json({ error: 'Failed to save contact' });
    }
});

module.exports = router;