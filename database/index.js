import mongoose from "mongoose";
import bcrypt from "bcrypt";

import userRepository from "../repository/userRepository.js";

export default {
  /**
   * Verbindung zu MongoDB herstellen
   */
  async connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017', {
        user: 'root',
        pass: 'password',
        dbName: 'myblog',
      });
      console.log('Connected to MongoDB');
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * Standarddaten erstellen
   */
  async createDefaultData() {
    try {
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

      console.log('Default data created');
    } catch (e) {
      console.error(e);
    }
  },
}