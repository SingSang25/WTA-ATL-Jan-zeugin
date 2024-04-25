import express from 'express';
import blogController from '../controller/blogController.js';
import commentRoutes from './commentRoutes.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', blogController.getBlogs);
router.post('/', authMiddleware.auth, blogController.createBlog);
router.get('/:id', blogController.getBlog);
router.put('/:id', authMiddleware.auth, blogController.updateBlog);
router.delete('/:id', authMiddleware.auth, blogController.deleteBlog);
router.use('/:id/comments', commentRoutes);

export default router;