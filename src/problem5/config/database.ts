import { DataSource } from 'typeorm';
import { Book } from '../entities/Book';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { Client } from 'pg';

// Load environment variables for TypeORM CLI
const envPath = path.join(process.cwd(), 'src/problem5/.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432');
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME || 'bookstore';

async function createDatabaseIfNotExists() {
    const client = new Client({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: 'postgres', // Connect to default postgres database
    });

    try {
        await client.connect();

        // Check if database exists
        const result = await client.query(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            [DB_NAME]
        );

        if (result.rows.length === 0) {
            await client.query(`CREATE DATABASE "${DB_NAME}"`);
        }

    } catch (error) {
        console.error('Error checking/creating database:', error instanceof Error ? error.message : error);
        throw error;
    } finally {
        await client.end();
    }
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Book],
    migrations: [],
    subscribers: [],
});

const originalInitialize = AppDataSource.initialize.bind(AppDataSource);
AppDataSource.initialize = async function() {
    await createDatabaseIfNotExists();
    return originalInitialize();
};
