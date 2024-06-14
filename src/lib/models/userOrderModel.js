
import mongoose from 'mongoose';
import { productSchema } from './productModel';

const userOrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    orders: {
        type: [productSchema],
        default: [],
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
        default: [],
    }
},{timestamps: true});

export const UserOrderModel = mongoose.models?.userorder || mongoose.model('userorder', userOrderSchema);