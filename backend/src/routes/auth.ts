import { getProfile, login, register } from '@/controllers/authController';
import { authenticateToken } from '@/middleware/auth';
import { handleValidationErrors, validateUserLogin, validateUserRegistration } from '@/middleware/validation';
import { Router } from 'express';

const router = Router();

// Public routes
router.post('/register', validateUserRegistration, handleValidationErrors, register);
router.post('/login', validateUserLogin, handleValidationErrors, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

export default router;
