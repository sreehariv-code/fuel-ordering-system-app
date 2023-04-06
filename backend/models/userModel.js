import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
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
    location: {
        // Add location details
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
});

const User = mongoose.models.users || mongoose.model('user', UserSchema);
export default User;