import mongoose from "mongoose";
import bcrypt from "bcrypt";

import userRepository from "../repository/userRepository.js";

export default {
  /**
   * Verbindung zu MongoDB
   * @returns {Promise<void>}
   */
  async connect() {
    await mongoose.connect('mongodb://localhost:27017', {
      user: 'root',
      pass: 'password',
      dbName: 'myblog',
    });
    console.log('Connected to MongoDB');
  },

  /**
   * Standarddaten erstellen
   * @returns {Promise<void>}
   */
  async createDefaultData() {

    const data = {
      username: 'admin',
      email: 'admin@localhost.ch',
      password: 'admin',
      isAdmin: true,
    }
    data.password = await bcrypt.hash(data.password, 10);
    const user = await userRepository.findBy({ username: data.username });

    if (user === null) {
      await userRepository.create(data)
    }
  },
}