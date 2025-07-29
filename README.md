# Code Challenge Solutions

This repository contains TypeScript solutions for various coding challenges, organized by problem folders.

## 📁 Project Structure

```
code-challenge/
├── src/
│   ├── problem4/          # Sum to N implementations
│   ├── problem5/          # Problem 5 solution
│   └── problem6/          # Problem 6 solution
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (>= 16.0.0)
- npm (>= 8.0.0)

### Quick Start

```bash
npm i
cd src/problem5
cp .env.example .env
cd ../..
npm run dev:problem5
```

**Access the application:**
- API: `http://localhost:3000/api/books`
- Documentation: `http://localhost:3000/api-docs`

> **Note:** Requires PostgreSQL database. Configure credentials in `src/problem5/.env`


## 🧪 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Quick start - runs Problem 5 Book API |
| `npm i` | Install dependencies (shows quick start message) |
| `npm run dev:problem5` | Start Book Management API with auto-reload |
| `npm run setup` | Install dependencies and build project |
| `npm test` | Run all problem solutions |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run build:watch` | Compile TypeScript in watch mode |
| `npm run clean` | Remove compiled files |
| `npm run lint` | Run ESLint on TypeScript files |
| `npm run format` | Format code with Prettier |
| `npm run dev:problemX` | Run specific problem with ts-node |

## 📝 Problem Solutions

### Problem 4: Sum to N
**File:** `src/problem4/sum_to_n.ts`

Implements three different approaches to calculate the sum from 1 to n:
- **sum_to_n_a**: Mathematical formula O(1)
- **sum_to_n_b**: Iterative approach O(n) 
- **sum_to_n_c**: Recursive approach O(n)

**Run:**
```bash
npm run test:problem4
# or
npm run dev:problem4
```

### Problem 5: Book Management API
**Files:** `src/problem5/` 

Using Book as the resource for this problem.

#### 🏗️ **Architecture & Technologies**
- **Express.js** server with TypeScript
- **PostgreSQL** database with TypeORM ORM
- **Swagger/OpenAPI** documentation
- **Joi** validation schemas
- **Clean architecture** with separation of concerns

#### 🚀 **Quick Start**

**Prerequisites:**
- PostgreSQL database running
- Environment variables configured

**Environment Variables:**
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

**Run the server:**
```bash
npm run dev:problem5        # Development mode with auto-reload
npm run start:problem5      # Production mode
npm run run-problem 5       # Build and run
```

#### 📖 **API Endpoints**

**Base URL:** `http://localhost:3000`
**Documentation:** `http://localhost:3000/api-docs`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Redirects to API documentation |
| `GET` | `/api-docs` | Interactive Swagger UI |
| `POST` | `/api/books` | Create a new book |
| `GET` | `/api/books` | Get all books with filtering/pagination |
| `GET` | `/api/books/:id` | Get book by ID |
| `PUT` | `/api/books/:id` | Update book by ID |
| `DELETE` | `/api/books/:id` | Delete book by ID |

#### 📋 **Book Schema**
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

#### 🔍 **Query Parameters**
- `genre` - Filter by book genre
- `status` - Filter by availability status
- `search` - Text search across title, author, and description
- `limit` - Number of results per page (1-100, default: 10)
- `offset` - Number of results to skip (default: 0)

#### 📁 **Project Structure**
```
src/problem5/
├── config/
│   ├── database.ts        # TypeORM PostgreSQL configuration
│   └── swagger.ts         # Swagger/OpenAPI setup
├── controllers/
│   └── BookController.ts  # HTTP request handlers
├── entities/
│   └── Book.ts           # TypeORM entity definition
├── models/
│   └── BookModel.ts      # Database operations layer
├── routes/
│   └── bookRoutes.ts     # API route definitions with Swagger docs
├── types/
│   └── Book.ts           # TypeScript interfaces
├── validation/
│   └── bookValidation.ts # Joi validation schemas
├── middleware/
│   └── errorHandler.ts   # Global error handling
├── server.ts             # Express server setup
└── index.ts              # Application entry point
```

### Problem 6
**File:** `src/problem6/index.ts`
- TODO: Add problem description and solution
