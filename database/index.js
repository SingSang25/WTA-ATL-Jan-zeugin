import mongoose from "mongoose"

export default {
  /**
   * Connect to MongoDB
   * @returns {Promise<void>}
   */
  async connect() {
    await mongoose.connect('mongodb://localhost:27017', {
      user: 'root',
      pass: 'password',
      dbName: 'api',
    });
    console.log('Connected to MongoDB');
  }
}