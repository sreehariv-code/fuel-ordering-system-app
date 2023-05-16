import express from 'express'
import {
    registerDriver,
    loginDriver,
    getDriverProfile,
    logoutDriver,
    getDrivers,
} from '../controllers/driverController.js'
import { isAuthenticatedUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getDrivers)
router.post('/signup', registerDriver)
router.post('/login', loginDriver)
router.get('/logout', isAuthenticatedUser, logoutDriver)
router.get('/profile', isAuthenticatedUser, getDriverProfile)

export default router;