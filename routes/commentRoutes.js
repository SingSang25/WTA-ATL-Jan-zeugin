import express from 'express';
import commentController from '../controller/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', commentController.getComments);
router.post('/', authMiddleware.auth, commentController.createComment);
router.put('/:id', authMiddleware.auth, commentController.updateComment);
router.delete('/:id', authMiddleware.auth, commentController.deleteComment);

export default router;


