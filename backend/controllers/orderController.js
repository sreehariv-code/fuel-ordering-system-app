import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js';
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
    if(!fuelType || !fuelAmount || !paidAmount || !distributor) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const order = await Order.create({
        user,
        distributor,
        fuelType,
        fuelAmount,
        paidAmount,
    })

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
    const order = await Order.findById(id)
    let updatedOrder

    if(req.role === 'user') {
        // Check if logged user has placed the order
        if(order.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not authorized')
        }
        
        if(order.status === 'Pending') {
            updatedOrder = await Order.findByIdAndUpdate(id, {status: 'Cancelled'}, {new: true})
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
            updatedOrder = await Order.findByIdAndUpdate(id, {status}, {new: true})
        }
        else {
            res.status(400)
            throw new Error('Order status cannot be changed')
        }
    }
    if(req.role === 'driver') {
        // Check if logged driver has been assigned the order
        if(order.driver.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not authorized')
        }
        
        const { status } = req.body
        if(status !== 'Delivered' && status !== 'Returned') {
            res.status(400) 
            throw new Error('Invalid status')
        }

        if(order.status === 'Processing') {
            updatedOrder = await Order.findByIdAndUpdate(id, {status}, {new: true})
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

export {
    getOrders,
    placeOrder,
    updateOrderStatus,
}