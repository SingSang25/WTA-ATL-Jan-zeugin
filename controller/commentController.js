import commentRepository from '../repository/commentRepository.js';
import authService from '../service/authService.js';

export default {
    async getComments(req, res) {
        const blogId = req.params.blogId;
        const comment = await commentRepository.findAll(blogId);
        if (comment === null) {
            res.status(404).send('Blog not found');
            return;
        }

        res.send(comment);
    },

    async createComment(req, res) {
        const blogId = req.params.blogId;
        const user = await authService.getUserFromToken(req.headers.authorization);

        const comment = {
            user: user,
            createComment: new Date(),
            lastUpdate: new Date(),
            content: req.body.content,
            blogId: blogId
        };

        try {
            const createdComment = await commentRepository.create(comment);
            res.status(201).send(createdComment);
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    async updateComment(req, res) {
        const blogId = req.params.id;
        const commentId = req.params.id;
        const comment = req.body;
        try {
            const updatedComment = await commentRepository.update(blogId, commentId, comment);
            res.status(200).send(updatedComment);
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    async deleteComment(req, res) {
        const blogId = req.params.id;
        const commentId = req.params.id;
        try {
            await commentRepository.remove(blogId, commentId);
            res.status(204).send();
        } catch (e) {
            res.status(400).send(e.message);
        }
    },
}