import mongoose from "mongoose";
import commentSchema from "../schema/commentSchema.js";

/**
 * @class Comment
 * @property {string} _id Die ID des Kommentars
 * @property {object} user Der Benutzer, der den Kommentar erstellt hat
 * @property {Date} createComment Das Datum, an dem der Kommentar erstellt wurde
 * @property {Date} lastUpdate Das Datum, an dem der Kommentar zuletzt aktualisiert wurde
 * @property {string} content Der Inhalt des Kommentars
 * @property {string} blogId Die ID des Blogs, zu dem der Kommentar gehört
 */
const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;
