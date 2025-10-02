import { Request } from 'express';

// Extended Request interface for authenticated routes
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// User types
export interface User {
    id: string;
    email: string;
    username?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserRequest {
    email: string;
    password: string;
    username?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

// Common pagination interface
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
