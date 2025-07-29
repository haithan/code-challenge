## Quick Start

```bash
# From the project root
npm i
cd src/problem5
cp .env.example .env
cd ../..
npm run dev:problem5
```

- **API**: http://localhost:3000/api/books
- **Documentation**: http://localhost:3000/api-docs

## Overview

In this problem solving, I'm using the book as the resource that this backend application will be handle

## Architecture

### Technologies Used
- **Express.js** - Web framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Database
- **Swagger/OpenAPI** - API documentation
- **Joi** - Request validation
- **TypeScript** - Type safety

### Project Structure
```
src/problem5/
├── config/
│   ├── database.ts        # Database configuration
│   └── swagger.ts         # API documentation setup
├── controllers/
│   └── BookController.ts  # HTTP request handlers
├── entities/
│   └── Book.ts           # Database entity
├── models/
│   └── BookModel.ts      # Business logic layer
├── routes/
│   └── bookRoutes.ts     # API endpoints
├── types/
│   └── Book.ts           # TypeScript interfaces
├── validation/
│   └── bookValidation.ts # Input validation
├── middleware/
│   └── errorHandler.ts   # Error handling
├── server.ts             # Express server setup
└── index.ts              # Entry point
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Redirects to API documentation |
| `GET` | `/api-docs` | Interactive Swagger UI |
| `POST` | `/api/books` | Create a new book |
| `GET` | `/api/books` | Get all books (with filters) |
| `GET` | `/api/books/:id` | Get book by ID |
| `PUT` | `/api/books/:id` | Update book |
| `DELETE` | `/api/books/:id` | Delete book |

## Book Schema

```typescript
{
  id: number;                                    // Auto-generated
  title: string;                                 // Required
  author: string;                                // Required
  description: string;                           // Required
  genre: string;                                 // Required
  status: 'available' | 'borrowed' | 'reserved'; // Default: 'available'
  createdAt: Date;                              // Auto-generated
  updatedAt: Date;                              // Auto-generated
}
```

## Database Configuration

Requires PostgreSQL database. Configure using environment variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=bookstore
```

## Example Usage

### Create a Book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "genre": "Fiction"
  }'
```

### Get All Books
```bash
curl http://localhost:3000/api/books
```

### Search Books
```bash
curl "http://localhost:3000/api/books?search=Gatsby&limit=5"
```

### Filter by Status
```bash
curl "http://localhost:3000/api/books?status=available"
```

## Development

### Available Scripts
```bash
npm run dev:problem5    # Start with auto-reload
npm start              # Quick start (same as above)
npm run build          # Compile TypeScript
npm run lint           # Run ESLint
npm run format         # Format code
```

### Environment Variables
The `.env` file is created from `.env.example`:
```bash
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=bookstore
API_URL=http://localhost:3000
```

## Quick Links

- **API Base**: http://localhost:3000/api/books
- **Documentation**: http://localhost:3000/api-docs

---
