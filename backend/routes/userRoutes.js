import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
    getUsers,
} from '../controllers/userController.js'
import { isAuthenticatedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/logout', isAuthenticatedUser, logoutUser)
router.get('/profile', isAuthenticatedUser, getUserProfile)
router.patch('/update-profile', isAuthenticatedUser, updateUserProfile)

export default router;