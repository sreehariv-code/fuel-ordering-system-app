import mongoose, { Schema } from "mongoose";

const DistributorSchema = mongoose.Schema({
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
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    fuelTypes: {
        type: [String],
        required: true
    },
    stationDetails: {
        stationID: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true
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
    ]
});

const Distributor = mongoose.models.distributors || mongoose.model('distributor', DistributorSchema);
export default Distributor;