import Blog from '../model/blogModel.js';

export default {
    /**
     * Alle Blogs finden
     * @returns {Array<Blog>} Liste aller Blogs
     */
    async findAll() {
        return Blog.find();
    },

    /**
     * Liefert ein einzelnes Blog nach id
     * @param {string} id Die ID des zu suchenden Blogs
     * @returns {Blog} Der Blog
     */
    async find(id) {
        const blog = await Blog.findOne({ _id: id });
        return blog;
    },

    /**
     * Findet ein einzelnes Blog per Filter
     * @param {object} filter Der anzuwendende Filter
     * @returns {Blog|null} Der Blog oder null
     */
    async findBy(filter) {
        const blog = await Blog.findOne(filter);
        return blog;
    },

    /**
     * Erzeugt einen neuen Blog
     * @param {Blog} blog Der Blog, der angelegt werden soll
     * @returns {Blog} Der erstellte Blog
     */
    async create(blog) {
        const newBlog = new Blog(blog);
        return newBlog.save();
    },

    /**
     * Aktualisiert einen Blog mit der ID
     * @param {string} id Die ID des zu aktualisierenden Blogs
     * @param {Blog} blog Die Daten, mit denen der Blog aktualisiert werden soll
     * @returns {Blog} Der aktualisierte Blog
     */
    async update(id, blog) {
        return Blog.findByIdAndUpdate(id, blog);
    },

    /**
     * Löscht ein Blog nach ID
     * @param {string} id Die ID des zu löschenden Blogs
     * @returns {Blog} Der gelöschte Blog
     */
    async remove(id) {
        return Blog.findByIdAndDelete(id);
    },
};