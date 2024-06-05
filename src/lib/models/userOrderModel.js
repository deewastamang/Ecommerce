
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
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'canceled', 'delivered'],
        default: 'pending',

    },
    wishlist: {
        type: [productSchema],
    }
},{timestamps: true});

export const UserOrderModel = mongoose.models?.userorder || mongoose.model('userorder', userOrderSchema);