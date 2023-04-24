import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    logoutUser,
    getUsers,
} from '../controllers/userController.js'
import { isAuthorizedUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/logout', isAuthorizedUser, logoutUser)
router.get('/profile', isAuthorizedUser, getUserProfile)
router.patch('/update-profile', isAuthorizedUser, updateUserProfile)

export default router;