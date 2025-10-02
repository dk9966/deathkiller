import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// Validation error handler
export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors.array()
        });
        return;
    }
    next();
};

// User registration validation
export const validateUserRegistration = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('username')
        .optional()
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters')
];

// User login validation
export const validateUserLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];
