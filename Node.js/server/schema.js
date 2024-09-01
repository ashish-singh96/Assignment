const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Product collection
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    location:{
        type: String,
        required: true,
        trim: true
    },
    // images: [String], // Array of image URLs
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
