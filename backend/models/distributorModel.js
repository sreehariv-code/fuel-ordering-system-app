import mongoose, { Schema } from "mongoose";

const fuelTypeSchema = mongoose.Schema({
    name: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Premium petrol', 'CNG'],
    },
    unitPrice: {
        type: Number,
    },
    available: {
        type: Boolean,
        default: false,
    }
})

const DistributorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be specified']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email must be specified']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number must be specified']
    },
    avatar: {
        type: String
    },
    fuelTypes: {
        type: [fuelTypeSchema],
    },
    stationDetails: {
        stationName: {
            type: String,
            required: [true, 'Station name must be specified'],
        },
        licenceNumber: {
            type: String,
            required: [true, 'License number must be specified'],
            unique: true
        },
        address: {
            type: String,
            required: [true, 'Address must be specified'],
        },
        location: {
            // Add location details
        }
    },
    receivedOrders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    online: {
        type: Boolean,
        default: false,
    }
});

const Distributor = mongoose.models.distributors || mongoose.model('distributor', DistributorSchema);
export default Distributor;