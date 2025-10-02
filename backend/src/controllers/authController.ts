import { pool } from '@/config/database';
import { AppError } from '@/middleware/error';
import { ApiResponse, CreateUserRequest, LoginRequest, User } from '@/types';
import { comparePassword, hashPassword } from '@/utils/hash';
import { generateToken } from '@/utils/jwt';
import { NextFunction, Request, Response } from 'express';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password, username }: CreateUserRequest = req.body;

        // Check if user already exists
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            throw new AppError('User with this email already exists', 400);
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const result = await pool.query(
            `INSERT INTO users (email, password, username, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, email, username, role, created_at, updated_at`,
            [email, hashedPassword, username || null, 'user']
        );

        const user: User = result.rows[0];
        const token = generateToken(user);

        const response: ApiResponse = {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role
                },
                token
            },
            message: 'User registered successfully'
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password }: LoginRequest = req.body;

        // Find user by email
        const result = await pool.query(
            'SELECT id, email, password, username, role, created_at, updated_at FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            throw new AppError('Invalid email or password', 401);
        }

        const user: User & { password: string } = result.rows[0];

        // Verify password
        const isValidPassword = await comparePassword(password, user.password);

        if (!isValidPassword) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = generateToken(user);

        const response: ApiResponse = {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role
                },
                token
            },
            message: 'Login successful'
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = (req as any).user.id;

        const result = await pool.query(
            'SELECT id, email, username, role, created_at, updated_at FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            throw new AppError('User not found', 404);
        }

        const user: User = result.rows[0];

        const response: ApiResponse = {
            success: true,
            data: { user }
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
};
