import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Distributor from '../models/distributorModel.js'
import Driver from '../models/driverModel.js'
import mongoose from 'mongoose'

// @desc Get list of orders
// @route GET /api/orders
// @access private
const getOrders = asyncHandler(async (req, res) => {
    let orders;

    if(req.role === 'user') {
        orders = await Order.find({ user: req.user.id });
    }
    else if(req.role === 'distributor') {
        orders = await Order.find({ distributor: req.user.id });
    }
    else if(req.role === 'driver') {
        orders = await Order.find({ driver: req.user.id });
    }

    if(!orders) {
        res.status(404);
        throw new Error('No orders found')
    } 
    else
        res.status(200).json(orders);
})

// @desc Place an order
// @route GET /api/orders/create-order
// @access private
const placeOrder = asyncHandler( async(req, res) => {
    const { fuelType, fuelAmount, paidAmount, distributor } = req.body
    const user = req.user.id
    console.log({
        fuelType,
        fuelAmount,
        paidAmount,
        distributor,
    })
    if(!fuelType || !fuelAmount || !paidAmount || !distributor) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const order = await Order.create({
        user,
        distributor: new mongoose.Types.ObjectId(distributor),
        fuelType,
        fuelAmount,
        paidAmount,
    })
    console.log(order)
    if(order) {
        res.status(201).json({
            _id: order.id,
            user,
            distributor,
            fuelType,
            fuelAmount,
            paidAmount,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid order data')
    }
})

// @desc Update status of an order
// @route PATCH /api/orders/:id
// @access private
const updateOrderStatus = asyncHandler( async(req, res) => {
    const { id } = req.params
    const orderId = new mongoose.Types.ObjectId(id)
    const order = await Order.findById(orderId)
    let updatedOrder

    if(req.role === 'user') {
        // Check if logged user has placed the order
        if(order.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not authorized')
        }
        
        if(order.status === 'Pending') {
            updatedOrder = await Order.findByIdAndUpdate(orderId, {status: 'Cancelled'}, {new: true})
        }
        else {
            res.status(400)
            throw new Error('Order cannot be cancelled at this time')
        }
    }
    if(req.role === 'distributor') {
        // Check if logged distributor has received the order
        if(order.distributor.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not authorized')
        }
        const { status } = req.body
        if(status !== 'Processing' && status !== 'Rejected') {
            res.status(400) 
            throw new Error('Invalid status')
        }

        if(order.status === 'Pending') {
            updatedOrder = await Order.findByIdAndUpdate(orderId, {status}, {new: true})
        }
        else {
            res.status(400)
            throw new Error('Order status cannot be changed')
        }
    }
    if(req.role === 'driver') {
        const { status } = req.body

        // Check if logged driver has been assigned the order
        if(order.driver.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not authorized')
        }
        
        if(status !== 'Delivered' && status !== 'Returned' && status !== 'Collected') {
            res.status(400) 
            throw new Error('Invalid status')
        }

        if(order.status === 'Processing' || order.status === 'Collected') {
            updatedOrder = await Order.findByIdAndUpdate(orderId, {status}, {new: true})
        }
        else {
            res.status(400)
            throw new Error('Order status cannot be changed')
        }
    }

    res.status(200).json({
        status: updatedOrder.status
    })
})

// Function to calculate 3-D distance between two points using Haversine formula
const getDistance = (lat1, lon1, lat2, lon2) => {
    // approximate radius of earth in km
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
}

// Function to sort drivers by distance
const sortDriversByDistance = (sourceLat, sourceLon, driverLocations) => {
    const driversWithDistance = driverLocations.map(driverLocation => {
        const distance = getDistance(sourceLat, sourceLon, driverLocation.location.latitude, driverLocation.location.longitude)

        return { ...driverLocation, distance }
    })

    const sortedDrivers = driversWithDistance.sort((a, b) => a.distance - b.distance)
    const nearbyDrivers = sortedDrivers.filter(destination => destination.distance <= 20)
    return nearbyDrivers;
}

// @desc Assign an order to the nearest driver
// @route PATCH /api/orders/assign-driver/:id
// @access public
const assignDriver = asyncHandler(async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    const distributor = await Distributor.findById(order.distributor)
    if(!distributor) {
        res.status(404)
        throw new Error('Distributor not found')
    }
    const drivers = await Driver.find({online: true}).select('-password')
    if(!drivers) {
        res.status(404)
        throw new Error('No drivers found')
    }
    const driverLocations = drivers.map(driver => ({id: driver._id, location: driver.location}))
    const { latitude, longitude } = distributor.location

    const sortedDriverLocations = sortDriversByDistance(latitude, longitude, driverLocations)
    
    const sortedDrivers = sortedDriverLocations.map((sortedLocation) => {
        const driver = drivers.find(driver => driver._id === sortedLocation.id)
        return { driver, distance: sortedLocation.distance }
    })
    if(!sortedDrivers) {
        res.status(404)
        throw new Error('No drivers found within the specified range')
    }

    const assignedDriver = sortedDrivers[0].driver
    const updatedOrder = await Order.findByIdAndUpdate(id, {driver: assignedDriver._id}, {new: true})
    if(!updatedOrder) {
        res.status(404)
        throw new Error('Driver not assigned')
    }
    res.status(200).json(updatedOrder)
})


export {
    getOrders,
    placeOrder,
    updateOrderStatus,
    assignDriver,
}