import mongoose from "mongoose";
import userSchema from "../schema/userSchema.js";

/**
 * @class User
 * @property {string} _id The id of the user
 * @property {string} userName The user name of the user
 * @property {string} email The email of the user
 * @property {string} password The password of the user
 */
const User = new mongoose.model("User", userSchema);

export default User;
