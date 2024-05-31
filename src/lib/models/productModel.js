import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        requried: true,
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
        type: String,
    },
    rating: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    stock: {
        type: Number,
    }
})

export const ProductModel = mongoose.models?.Product || mongoose.model("Product", productSchema)