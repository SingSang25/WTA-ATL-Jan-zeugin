import blogRepository from '../repository/blogRepository.js';
import authService from '../service/authService.js';

export default {

    async getBlogs(req, res) {
        const blogs = await blogRepository.findAll();
        res.send(blogs);
    },

    async createBlog(req, res) {
        const data = req.body;
        const user = await authService.getUserFromToken(req.headers.authorization);

        const blog = {
            title: data.title,
            user: user,
            createBlog: new Date(),
            lastUpdate: new Date(),
            blocks: data.blocks
        };

        try {
            const createdBlog = await blogRepository.create(blog);
            res.status(201).send(createdBlog);
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    async getBlog(req, res) {
        const blogId = req.params.id;
        const blog = await blogRepository.find(blogId);
        if (blog === null) {
            res.status(404).send('Blog not found');
            return;
        }

        res.send(blog);
    },

    async updateBlog(req, res) {
        const blogId = req.params.id;
        const blog = req.body;
        try {
            const updatedBlog = await blogService.updateBlog(blogId, blog);
            res.status(200).send(updatedBlog);
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

    async deleteBlog(req, res) {
        const blogId = req.params.id;
        try {
            await blogRepository.remove(blogId);
            res.status(204).send();
        } catch (e) {
            res.status(400).send(e.message);
        }
    },

}