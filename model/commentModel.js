import mongoose from "mongoose";
import commentSchema from "../schema/commentSchema.js";

/**
 * @class Comment
 * @property {string} id 
 * @property {User} user
 * @property {datetime} createComment
 * @property {datetime} lastUpdate
 * @property {string} content
 * @property {string} blogId
 */

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;
