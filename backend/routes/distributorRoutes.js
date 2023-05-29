import express from 'express'
import {
    registerDistributor,
    loginDistributor,
    getDistributorProfile,
    getFuelInfo,
    updateFuelInfo,
    logoutDistributor,
    getDistributors,
    getNearbyDistributors,
} from '../controllers/distributorController.js'
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getDistributors)
router.get('/:radius', isAuthenticatedUser, isAuthorizedUser(['user']), getNearbyDistributors)
router.post('/signup', registerDistributor)
router.post('/login', loginDistributor)
router.get('/logout', isAuthenticatedUser, logoutDistributor)
router.get('/profile', isAuthenticatedUser, getDistributorProfile)
router.get('/fuel-info', isAuthenticatedUser, getFuelInfo)
router.patch('/update-fuel-info', isAuthenticatedUser, updateFuelInfo)

export default router