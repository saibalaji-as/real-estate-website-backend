const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

// GET all properties
router.get("/", async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties", error });
    }
});

// POST a new property
router.post("/", async (req, res) => {
    try {
        const { title, location, price, latitude, longitude } = req.body;
        if (!title || !location || !price || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProperty = new Property({ title, location, price, latitude, longitude });
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
        const { title, location, price, latitude, longitude } = req.body;
        const updatedProperty = await Property.findByIdAndUpdate(id, { title, location, price, latitude, longitude }, { new: true });
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
