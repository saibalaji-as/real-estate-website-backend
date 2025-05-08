const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        let query = {};
        
        // If userId is provided in query params, filter by that userId
        if (req.query.userId) {
            query.userId = req.query.userId;
        }
        console.log("Query:", query);
        console.log("Req:", req.query);
        const properties = await Contact.find(query);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties", error });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, address, city, state, country, zipCode, userId, property } = req.body;

        const newContact = new Contact({
            name,
            email,
            phone,
            address,
            city,
            state,
            country,
            zipCode,
            userId,
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