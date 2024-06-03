import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    new: {
        type: Boolean,
        default: false,
    },
    oldPrice: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: [String],
        default: [],
    },
    rating: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    stock: {
        type: Number,
    }
}, {timestamps: true})

export const ProductModel = mongoose.models?.Product || mongoose.model("Product", productSchema)