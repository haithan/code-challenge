import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/Book';

export const errorHandler = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errorType = 'ServerError';

    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = error.message;
        errorType = 'ValidationError';
    } else if (error.message.includes('duplicate key')) {
        statusCode = 409;
        message = 'Resource conflict - duplicate entry';
        errorType = 'ConflictError';
    } else if (error.message.includes('connection')) {
        statusCode = 500;
        message = 'Database connection error';
        errorType = 'DatabaseError';
    }

    const errorResponse: ApiResponse<never> = {
        success: false,
        error: errorType,
        message,
        timestamp: new Date().toISOString()
    };

    res.status(statusCode).json(errorResponse);
};
