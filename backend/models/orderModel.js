import mongoose, { Schema } from 'mongoose';

const orderSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Premium petrol', 'CNG'],
        required: [true, 'Fuel type must be specified']
    },
    fuelAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Collected', 'Delivered', 'Rejected', 'Returned', 'Cancelled'],
        default: 'Pending'
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    deliveryTime: {
        type: Date
    },
    distributor: {
        type: Schema.Types.ObjectId,
        ref: 'Distributor',
        required: true
    },
    // paymentStatus: {
    //     type: Boolean,
    //     default: false
    // },
    paymentMethod: {
        type: String,
        // required: true
    }
})

const Order = mongoose.models.orders || mongoose.model('order', orderSchema);
export default Order;