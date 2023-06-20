import express from 'express'
import {
    registerDistributor,
    loginDistributor,
    getDistributorProfile,
    getFuelInfo,
    updateFuelInfo,
    logoutDistributor,
    getDistributors,
    getDistributorById,
    getNearbyDistributors,
    updateDistributorProfile,
} from '../controllers/distributorController.js'
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getDistributors)
router.get('/distributor/:id', getDistributorById)
router.get('/range/:radius', isAuthenticatedUser, isAuthorizedUser(['user']), getNearbyDistributors)
router.post('/signup', registerDistributor)
router.post('/login', loginDistributor)
router.get('/logout', isAuthenticatedUser, logoutDistributor)
router.get('/profile', isAuthenticatedUser, getDistributorProfile)
router.patch('/update-profile', isAuthenticatedUser, updateDistributorProfile)
router.get('/fuel-info', isAuthenticatedUser, getFuelInfo)
router.patch('/update-fuel-info', isAuthenticatedUser, updateFuelInfo)

export default router