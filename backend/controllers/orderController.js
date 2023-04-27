import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Get list of orders
// @route GET /api/orders
// @access private
const getOrders = asyncHandler(async (req, res, next) => {
        let orders;

        if(req.role === 'user') {
            console.log(req.role)
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

const placeOrder = () => {

}

const updateOrder = () => {

}

const deleteOrder = () => {

}

export {
    getOrders,
    placeOrder,
    updateOrder,
    deleteOrder
}