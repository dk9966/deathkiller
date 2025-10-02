import { AuthenticatedRequest } from '@/types';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json({
            success: false,
            error: 'Access token required'
        });
        return;
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, decoded: any) => {
            if (err) {
                res.status(403).json({
                    success: false,
                    error: 'Invalid or expired token'
                });
                return;
            }

            req.user = decoded;
            next();
        }
    );
};

export const requireAdmin = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({
            success: false,
            error: 'Admin access required'
        });
        return;
    }
    next();
};
