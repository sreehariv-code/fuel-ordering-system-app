import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
} from '../controllers/userController.js'
import { isAuthorizedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/logout', isAuthorizedUser, logoutUser)
router.get('/profile', isAuthorizedUser, getUserProfile)
router.put('/update-profile', isAuthorizedUser, updateUserProfile)

export default router;