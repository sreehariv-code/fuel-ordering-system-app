import express from 'express'
import {
    registerDistributor,
    loginDistributor,
    getDistributorProfile,
    getFuelInfo,
    updateFuelInfo,
    logoutDistributor,
    getDistributors,
} from '../controllers/distributorController.js'
import { isAuthenticatedUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getDistributors)
router.post('/signup', registerDistributor)
router.post('/login', loginDistributor)
router.get('/logout', isAuthenticatedUser, logoutDistributor)
router.get('/profile', isAuthenticatedUser, getDistributorProfile)
router.get('/fuel-info', isAuthenticatedUser, getFuelInfo)
router.patch('/update-fuel-info', isAuthenticatedUser, updateFuelInfo)

export default router