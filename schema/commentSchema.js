import mongoose from "mongoose";

import User from "./userSchema.js";

const schema = {
  user: User,
  createBlog: Date,
  lastUpdate: Date,
  content: String
};

const blogSchema = new mongoose.Schema(schema);

// For JSON serialization, transform the user to show "id" instead of "_id"
// and remove password and version key from the object
blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
})

export default blogSchema;