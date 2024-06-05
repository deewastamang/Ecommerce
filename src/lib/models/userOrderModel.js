
import mongoose from 'mongoose';
import { productSchema } from './productModel';

const userOrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    orders: {
        type: [productSchema],
    },
    stripeSessionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'canceled', 'delivered'],
        default: 'pending',

    }
},{timestamps: true});

export const UserOrderModel = mongoose.models?.userorder || mongoose.model('userorder', userOrderSchema);