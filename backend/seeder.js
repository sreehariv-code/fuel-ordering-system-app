import connectDB from './config/db.js';
import { users, distributors, orders } from './data.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import dotenv from 'dotenv'
import Distributor from './models/distributorModel.js'

dotenv.config()

const importData = async () => {
    try {
        await connectDB()
        await User.deleteMany()
        await Distributor.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)
        const createdDistributors = await Distributor.insertMany(distributors)
        for(let i = 0; i < 5; i++) {
            if(i < 3)
                orders[i].user = createdUsers[0]._id.toString();
            else   
            orders[i].user = createdUsers[1]._id.toString();
        }
        
        const createdOrders = await Order.insertMany(orders);
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
        await Distributor.deleteMany()
        await Order.deleteMany();
        console.log("Data destroyed");
        process.exit();
    } catch (error) {
        console.log(`Error on deleting ${error.message}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") destroyData();
else importData();