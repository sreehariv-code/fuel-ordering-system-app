import mongoose, { Schema } from "mongoose";

const DriverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    avatar: {
        type: String
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    },
    licence: {
        type: String,
        required: true,
        unique: true
    },
    assignedOrders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
});

const Driver = mongoose.models.drivers || mongoose.model('driver', DriverSchema);
export default Driver;