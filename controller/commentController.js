import commentRepository from '../repository/commentRepository.js';

export default {
    async getComments(req, res) {
        const blogId = req.params.id;
        const blog = await commentRepository.findAll(blogId);
        if (blog === null) {
            res.status(404).send('Blog not found');
            return;
        }

        res.send(blog.comments);
    },

    async createComment(req, res) {
        const blogId = req.params.id;
        const comment = req.body;
        try {
            const createdComment = await commentRepository.create(blogId, comment);
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