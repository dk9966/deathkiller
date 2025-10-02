import { User } from '@/types';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (user: User): string => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        issuer: 'deathkiller-api',
        audience: 'deathkiller-app'
    });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = (token: string): any => {
    return jwt.decode(token);
};
