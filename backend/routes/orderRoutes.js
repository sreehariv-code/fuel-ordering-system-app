import express from 'express'
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js'
import {
    getOrders,
    placeOrder,
    updateOrder,
    deleteOrder,
} from '../controllers/orderController.js'

const router = express.Router();

// router.route('/').get(isAuthenticatedUser, isAuthorizedUser(['user', 'distributor', 'driver']), getOrders(req.role)).post(isAuthenticatedUser, isAuthorizedUser(['user']), placeOrder(req.user.role))
// router.route('/:id').patch(isAuthenticatedUser, isAuthorizedUser(['distributor', 'driver']), updateOrder(req.user.role)).delete(isAuthenticatedUser, isAuthorizedUser(['distributor']), rejectOrder(req.user.role))
// router.route('/').get(isAuthenticatedUser, isAuthorizedUser(['user', 'distributor', 'driver']), getOrders)
router.get('/', isAuthenticatedUser, isAuthorizedUser(['user', 'distributor', 'driver']), getOrders)
router.post('/create-order', isAuthenticatedUser, isAuthorizedUser(['user']), placeOrder)

export default router;

// getOrders function can be accessed by users, distributors and drivers
// placeOrder can be accessed only by user
// updateOrder can be accessed by distributor and driver
// rejectOrder can accessed only by distributor