import Blog from '../model/blogModel.js';

export default {
    /**
     * Find all users
     * @returns {Array<Blog>} List of all blogs
     */
    async findAll() {
        return Blog.find();
    },

    /**
     * Returns a single blog by id
     * @param {string} id The id of the blog to find
     * @returns {Blog} The blog
     */
    async find(id) {
        const blog = await Blog.findOne({ _id: id });
        return blog;
    },

    /**
     * Finds a singe blog by filter
     * @param {object} filter The filter to apply
     * @returns {Blog|null} The blog or null
     */
    async findBy(filter) {
        const blog = await Blog.findOne(filter);
        return blog;
    },

    /**
     * Creates a new blog
     * @param {Blog} blog 
     * @returns {Blog} The created blog
     */
    async create(blog) {
        const newBlog = new Blog(blog);
        return newBlog.save();
    },

    /**
     * Updates a blog by id
     * @param {string} id The id of the blog to update
     * @param {Blog} blog The data to update the blog with
     * @returns {Blog} The updated blog
     */
    async update(id, blog) {
        return Blog.findByIdAndUpdate(id, blog);
    },

    /**
     * Deletes a blog by id
     * @param {string} id The id of the blog to delete
     * @returns {Blog} The deleted blog
     */
    async remove(id) {
        return Blog.findByIdAndDelete(id);
    },
};