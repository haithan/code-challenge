import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Management API',
            version: '1.0.0',
            description: 'A simple Express API for managing books with TypeORM and PostgreSQL',
            contact: {
                name: 'API Support',
                email: 'support@bookapi.com'
            }
        },
        servers: [
            {
                url: process.env.API_URL || 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        tags: [
            {
                name: 'Books',
                description: 'Book management operations'
            }
        ]
    },
    apis: ['./src/problem5/routes/*.ts']
};

export const specs = swaggerJsdoc(options);
export { swaggerUi };
