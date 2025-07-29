import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    author: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 100 })
    genre: string;

    @Column({ type: 'varchar', length: 20, default: 'available' })
    status: 'available' | 'borrowed' | 'reserved';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
