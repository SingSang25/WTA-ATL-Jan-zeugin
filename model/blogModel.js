import mongoose from "mongoose";
import blogSchema from "../schema/blogSchema.js";


/**
 * @class Blog
 * @property {string} _id 
 * @property {string} title
 * @property {User} user
 * @property {datetime} createBlog
 * @property {datetime} lastUpdate
 * @property {string} content
 * TODo: Anpassen
 */
const Blog = new mongoose.model("Blog", blogSchema);

export default Blog;
