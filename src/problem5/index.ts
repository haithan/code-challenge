/**
 * Problem 5: ExpressJS Backend with CRUD Operations
 *
 * This file serves as the entry point for the backend server.
 * The actual server implementation is in server.ts
 */

import { startServer } from './server';

// Start the server if this file is run directly
if (require.main === module) {
    startServer();
}

export { startServer };
