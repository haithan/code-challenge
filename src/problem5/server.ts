import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables BEFORE importing other modules
const envPath = path.join(process.cwd(), 'src/problem5/.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    console.warn('⚠️  .env file not found. Please run: cd src/problem5 && cp .env.example .env');
}

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppDataSource } from './config/database';
import { bookRoutes } from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';
import { specs, swaggerUi } from './config/swagger';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
    res.redirect('/api-docs');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/books', bookRoutes);

// 404 handler
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`,
        timestamp: new Date().toISOString()
    });
});

// Global error handler
app.use(errorHandler);

export const startServer = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📚 API documentation: http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

export default app;
