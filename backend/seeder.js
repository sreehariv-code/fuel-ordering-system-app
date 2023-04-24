import connectDB from './config/db.js';
import {users, } from './data.js';
import User from './models/userModel.js';
import dotenv from 'dotenv'

dotenv.config();

const importData = async () => {
    try {
        await connectDB();
        await User.deleteMany();
        const createdUsers = await User.insertMany(users);
        console.log("Data imported");
        process.exit();
    } catch (error) {
        console.log(`Error on importing ${error.message}`);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await connectDB();
        await User.deleteMany();
        console.log("Data destroyed");
        process.exit();
    } catch (error) {
        console.log(`Error on deleting ${error.message}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") destroyData();
else importData();