import { Router } from 'express';
import { BookController } from '../controllers/BookController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - description
 *         - genre
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         description:
 *           type: string
 *           description: The description of the book
 *         genre:
 *           type: string
 *           description: The genre of the book
 *         status:
 *           type: string
 *           enum: [available, borrowed, reserved]
 *           description: The status of the book
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was last updated
 *     CreateBookRequest:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - description
 *         - genre
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         description:
 *           type: string
 *         genre:
 *           type: string
 *         status:
 *           type: string
 *           enum: [available, borrowed, reserved]
 *           default: available
 *     UpdateBookRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         description:
 *           type: string
 *         genre:
 *           type: string
 *         status:
 *           type: string
 *           enum: [available, borrowed, reserved]
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *         message:
 *           type: string
 *         error:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *     PaginatedResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             pagination:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 page_num:
 *                   type: integer
 *                 hasNext:
 *                   type: boolean
 *                 hasPrev:
 *                   type: boolean
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookRequest'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/', BookController.create);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with optional filters
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [available, borrowed, reserved]
 *         description: Filter by status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title, author, or description
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of books to return
 *       - in: query
 *         name: page_num
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/', BookController.getAll);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/:id', BookController.getById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookRequest'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid ID or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put('/:id', BookController.update);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.delete('/:id', BookController.delete);

export { router as bookRoutes };
