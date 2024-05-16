import mongoose from "mongoose";
import userSchema from "../schema/userSchema.js";

/**
 * @class User
 * @property {string} _id Die ID des Benutzers
 * @property {string} username Der Benutzername des Benutzers
 * @property {string} email Die E-Mail-Adresse des Benutzers
 * @property {string} password Das Passwort des Benutzers
 * @property {boolean} isAdmin Gibt an, ob der Benutzer ein Administrator ist
 */
const User = new mongoose.model("User", userSchema);

export default User;
