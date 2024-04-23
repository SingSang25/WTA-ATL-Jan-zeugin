import mongoose from "mongoose";

const schema = {
  userName: String,
  email: String,
  password: String,
  isAdmin: Boolean,
};

const userSchema = new mongoose.Schema(schema);

// For JSON serialization, transform the user to show "id" instead of "_id"
// and remove password and version key from the object
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
})

export default userSchema;