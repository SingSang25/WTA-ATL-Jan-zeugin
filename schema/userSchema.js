import mongoose from "mongoose";

const schema = {
  username: String,
  email: String,
  password: String,
  isAdmin: Boolean,
};

const userSchema = new mongoose.Schema(schema);

// Für die JSON-Serialisierung wandeln Sie den Benutzer so um, dass "id" anstelle von "_id" angezeigt wird.
// und entfernen Sie Passwort und Versionsschlüssel aus dem Objekt
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
})

export default userSchema;