import express from 'express';
import { signup, login, getCurrentUser, logout } from '../controllers/authController.js';
import wishlistRoutes from './wishlistRoutes.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.use('/wishlist', protect, wishlistRoutes);
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);

export default router;
