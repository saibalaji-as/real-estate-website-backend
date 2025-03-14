const Property = require("../models/Property");

exports.getAllProperties = async (req, res) => {
    const properties = await Property.find().populate("agent", "name email");
    res.json(properties);
};

exports.addProperty = async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ error: "Error adding property" });
    }
};
