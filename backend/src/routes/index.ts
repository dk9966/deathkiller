import { Router } from 'express';
import authRoutes from './auth';

const router = Router();

// API routes
router.use('/auth', authRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

export default router;
