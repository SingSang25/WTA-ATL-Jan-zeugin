import mongoose from "mongoose";
import blogSchema from "../schema/blogSchema.js";


/**
 * @class Blog
 * @property {string} _id  Die ID des Blogs
 * @property {string} title Der Titel des Blogs
 * @property {User} user Der Benutzer, der den Blog erstellt hat
 * @property {datetime} createBlog Das Datum, an dem der Blog erstellt wurde
 * @property {datetime} lastUpdate Das Datum, an dem der Blog zuletzt aktualisiert wurde
 * @property {string} blocks Die Blockteile des Blogs
 */
const Blog = new mongoose.model("Blog", blogSchema);

export default Blog;
