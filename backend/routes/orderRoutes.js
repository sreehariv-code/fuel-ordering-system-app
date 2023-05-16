import express from 'express'
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js'
import {
    getOrders,
    placeOrder,
    updateOrderStatus,
} from '../controllers/orderController.js'

const router = express.Router();


router.get('/', isAuthenticatedUser, getOrders)
router.post('/create-order', isAuthenticatedUser, isAuthorizedUser(['user']), placeOrder)
router.patch('/update-status/:id', isAuthenticatedUser, updateOrderStatus)
export default router;

// getOrders function can be accessed by users, distributors and drivers
// placeOrder can be accessed only by user
// updateOrderStatus can be accessed by users, distributors and drivers
