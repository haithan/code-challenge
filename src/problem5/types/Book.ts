export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    genre: string;
    status: 'available' | 'borrowed' | 'reserved';
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookRequest {
    title: string;
    author: string;
    description: string;
    genre: string;
    status?: 'available' | 'borrowed' | 'reserved';
}

export interface UpdateBookRequest {
    title?: string;
    author?: string;
    description?: string;
    genre?: string;
    status?: 'available' | 'borrowed' | 'reserved';
}

export interface BookFilters {
    genre?: string;
    status?: 'available' | 'borrowed' | 'reserved';
    search?: string;
    limit?: number;
    page_num?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        total: number;
        limit: number;
        page_num: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
