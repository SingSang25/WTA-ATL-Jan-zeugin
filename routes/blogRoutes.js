import express from 'express';
import blogController from '../controller/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', blogController.getBlogs);

router.post('/', authMiddleware, blogController.createBlog);

router.get('/:id', blogController.getBlog);

router.put('/:id', authMiddleware, blogController.updateBlog);

router.delete('/:id', authMiddleware, blogController.deleteBlog);

router.post('/:id/comment', authMiddleware, blogController.createComment);

router.put('/:id/comment/:id', authMiddleware, blogController.updateComment);

router.delete('/:id/comment/:id', authMiddleware, blogController.deleteComment);

export default router;