const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    type: { type: String }, // e.g., Apartment, Villa
    size: { type: String }, // e.g., "1200 sqft"
    rooms: { type: Number }, // number of rooms
    description: { type: String },
    images: { type: [String]}, // multiple image URLs or Base64 strings
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
