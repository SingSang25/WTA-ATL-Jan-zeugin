import authService from '../service/authService.js';

export default {

    async getBlogs(req, res) {
        //TODO
    },

    async createBlog(req, res) {
        const blog = req.body;
        const user = await authService.getUserFromToken(req.headers.authorization);
        try {
            res.status(201).send();
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    async getBlog(req, res) {
        //TODO
    },

    async updateBlog(req, res) {
        //TODO
    },

    async deleteBlog(req, res) {
        //TODO
    },

    async createComment(req, res) {
        //TODO
    },

    async updateComment(req, res) {
        //TODO
    },

    async deleteComment(req, res) {
        //TODO
    },

}