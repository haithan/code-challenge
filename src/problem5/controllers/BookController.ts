import { Request, Response, NextFunction } from 'express';
import { BookModel } from '../models/BookModel';
import { ApiResponse, PaginatedResponse, CreateBookRequest, UpdateBookRequest, BookFilters } from '../types/Book';
import { validateCreateBook, validateUpdateBook, validateBookFilters } from '../validation/bookValidation';

export class BookController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = validateCreateBook(req.body);
            if (error) {
                res.status(400).json({
                    success: false,
                    error: 'Validation Error',
                    message: error.details[0].message,
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            const bookData: CreateBookRequest = value;
            const book = await BookModel.create(bookData);

            res.status(201).json({
                success: true,
                data: book,
                message: 'Book created successfully',
                timestamp: new Date().toISOString()
            } as ApiResponse<typeof book>);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = validateBookFilters(req.query);
            if (error) {
                res.status(400).json({
                    success: false,
                    error: 'Validation Error',
                    message: error.details[0].message,
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            const filters: BookFilters = value;
            const { books, total } = await BookModel.findMany(filters);
            const limit = filters.limit || 10;
            const page_num = filters.page_num || 1;
            const totalPages = Math.ceil(total / limit);

            res.status(200).json({
                success: true,
                data: books,
                message: 'Books retrieved successfully',
                timestamp: new Date().toISOString(),
                pagination: {
                    total,
                    limit,
                    page_num,
                    hasNext: page_num < totalPages,
                    hasPrev: page_num > 1
                }
            } as PaginatedResponse<typeof books[0]>);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid ID',
                    message: 'Book ID must be a valid number',
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            const book = await BookModel.findById(id);
            if (!book) {
                res.status(404).json({
                    success: false,
                    error: 'Not Found',
                    message: 'Book not found',
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            res.status(200).json({
                success: true,
                data: book,
                message: 'Book retrieved successfully',
                timestamp: new Date().toISOString()
            } as ApiResponse<typeof book>);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid ID',
                    message: 'Book ID must be a valid number',
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            const { error, value } = validateUpdateBook(req.body);
            if (error) {
                res.status(400).json({
                    success: false,
                    error: 'Validation Error',
                    message: error.details[0].message,
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            const updateData: UpdateBookRequest = value;
            const book = await BookModel.update(id, updateData);

            if (!book) {
                res.status(404).json({
                    success: false,
                    error: 'Not Found',
                    message: 'Book not found',
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            res.status(200).json({
                success: true,
                data: book,
                message: 'Book updated successfully',
                timestamp: new Date().toISOString()
            } as ApiResponse<typeof book>);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid ID',
                    message: 'Book ID must be a valid number',
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            const deleted = await BookModel.delete(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    error: 'Not Found',
                    message: 'Book not found',
                    timestamp: new Date().toISOString()
                } as ApiResponse<never>);
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Book deleted successfully',
                timestamp: new Date().toISOString()
            } as ApiResponse<never>);
        } catch (error) {
            next(error);
        }
    }
}
