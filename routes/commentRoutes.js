import express from 'express';
import commentController from '../controller/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:blogId/', commentController.getComments);
router.post('/:blogId/', authMiddleware.auth, commentController.createComment);
router.put('/:blogId/:id', authMiddleware.auth, commentController.updateComment);
router.delete('/:blogId/:id', authMiddleware.auth, commentController.deleteComment);

export default router;


