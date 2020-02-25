import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /user
router.use('/user', userRoutes);

export default router;