# Code Challenge Solutions

This repository contains TypeScript solutions for various coding challenges, organized by problem folders.

## Project Structure

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

## Quick Start

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


## Important Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Quick start - runs Problem 5 Book API |
| `npm i` | Install dependencies (shows quick start message) |
| `npm run dev:problem5` | Start Book Management API with auto-reload |
| `npm run setup` | Install dependencies and build project |
| `npm test` | Run all problem solutions |
| `npm run build` | Compile TypeScript to JavaScript |

##  Problem Solutions

### Problem 4: Sum to N
**File:** `src/problem4/sum_to_n.ts`

**Run:**

```bash
npm run dev:problem4
```

### Problem 5: Book Management API
**Files:** `src/problem5/`

**Documentation:** `src/problem5/README.md`

Using Book as the resource for this problem.

### Problem 6

**Documentation:** `src/problem6/README.md`
