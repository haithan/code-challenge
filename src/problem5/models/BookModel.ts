import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Book } from '../entities/Book';
import { CreateBookRequest, UpdateBookRequest, BookFilters } from '../types/Book';

export class BookModel {
    private static repository: Repository<Book>;

    static async getRepository(): Promise<Repository<Book>> {
        if (!this.repository) {
            this.repository = AppDataSource.getRepository(Book);
        }
        return this.repository;
    }

    static async create(data: CreateBookRequest): Promise<Book> {
        const repository = await this.getRepository();
        const book = repository.create({
            ...data,
            status: data.status || 'available'
        });
        return await repository.save(book);
    }

    static async findById(id: number): Promise<Book | null> {
        const repository = await this.getRepository();
        return await repository.findOne({ where: { id } });
    }

    static async findMany(filters?: BookFilters): Promise<{ books: Book[]; total: number }> {
        const repository = await this.getRepository();
        const queryBuilder = repository.createQueryBuilder('book');

        if (filters?.genre) {
            queryBuilder.andWhere('book.genre = :genre', { genre: filters.genre });
        }

        if (filters?.status) {
            queryBuilder.andWhere('book.status = :status', { status: filters.status });
        }

        if (filters?.search) {
            queryBuilder.andWhere(
                '(book.title LIKE :search OR book.author LIKE :search OR book.description LIKE :search)',
                { search: `%${filters.search}%` }
            );
        }

        const total = await queryBuilder.getCount();

        if (filters?.limit) {
            queryBuilder.limit(filters.limit);
        }

        if (filters?.page_num && filters?.limit) {
            const offset = (filters.page_num - 1) * filters.limit;
            queryBuilder.offset(offset);
        }

        queryBuilder.orderBy('book.createdAt', 'DESC');
        const books = await queryBuilder.getMany();

        return { books, total };
    }

    static async update(id: number, data: UpdateBookRequest): Promise<Book | null> {
        const repository = await this.getRepository();
        const book = await this.findById(id);

        if (!book) {
            return null;
        }

        Object.assign(book, data);
        return await repository.save(book);
    }

    static async delete(id: number): Promise<boolean> {
        const repository = await this.getRepository();
        const result = await repository.delete(id);
        return result.affected !== 0;
    }

    static async exists(id: number): Promise<boolean> {
        const repository = await this.getRepository();
        const count = await repository.count({ where: { id } });
        return count > 0;
    }
}
