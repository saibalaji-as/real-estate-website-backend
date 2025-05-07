const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

// GET all properties
router.get("/", async (req, res) => {
    try {
        let query = {};
        
        // If userId is provided in query params, filter by that userId
        if (req.query.userId) {
            query.userId = req.query.userId;
        }
        console.log("Query:", query);
        console.log("Req:", req.query);
        const properties = await Property.find(query);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties", error });
    }
});

// POST a new property
router.post("/", async (req, res) => {
    try {
        const { title, location, price, latitude, longitude, type, description, rooms, size, images, userId } = req.body;
        if (!title || !location || !price || !latitude || !longitude || !type || !description || !rooms || !size || !images.length || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProperty = new Property({ title, location, price, latitude, longitude, type, description, rooms, size, images, userId });
        await newProperty.save();
        res.status(201).json({ message: "Property added successfully", property: newProperty });
    } catch (error) {
        res.status(500).json({ message: "Error adding property", error });
    }
});

// PUT - Update an existing property
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, price, latitude, longitude, type, description, rooms, size, images, userId } = req.body;
        const updatedProperty = await Property.findByIdAndUpdate(id, { title, location, price, latitude, longitude, type, description, rooms, size, images, userId }, { new: true });
        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json({ message: "Property updated successfully", property: updatedProperty });
    } catch (error) {
        res.status(500).json({ message: "Error updating property", error });
    }
});

// DELETE - Remove a property
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting property", error });
    }
});

module.exports = router;
