import mongoose from "mongoose";

import User from "./userSchema.js";

const schema = {
  user: User,
  createComment: Date,
  lastUpdate: Date,
  content: String,
  blogId: String
};

const commentSchema = new mongoose.Schema(schema);

// Für die JSON-Serialisierung wandeln Sie den Benutzer so um, dass "id" anstelle von "_id" angezeigt wird.
// und entfernen Sie Passwort und Versionsschlüssel aus dem Objekt
commentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

export default commentSchema;