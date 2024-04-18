import mongoose from "mongoose";
import commentSchema from "../schema/commentSchema.js";

/**
 * @class Comment
 * @property {string} _id 
 * @property {User} user
 * @property {datetime} createBlog
 * @property {datetime} lastUpdate
 * @property {string} content
 */
const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;
