import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import userRepository from '../repository/userRepository.js';

/**
 * AuthService
 */
export default {
  async register(data) {
    if (!data.email || !data.password || !data.username) {
      throw new Error('Invalid data');
    }

    // Check if e-mail is already in use
    const existingUser = await userRepository.findBy({ email: data.email });
    if (existingUser !== null) {
      throw new Error('User already exists');
    }

    // Check if username is already in use
    const existingusername = await userRepository.findBy({ username: data.username });
    if (existingusername !== null) {
      throw new Error('User already exists');
    }

    // Hash password
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;

    data.isAdmin = false;

    // Create and save user
    const registeredUser = await userRepository.create(data);
    return registeredUser;
  },

  async login(data) {
    if ((data.email || data.username) && data.password) {

      let user;

      if (data.email) {
        user = await userRepository.findBy({ email: data.email });
      } else if (data.username) {
        user = await userRepository.findBy({ username: data.username });
      } else {
        throw new Error('Invalid data');
      }

      if (user !== null) {
        // Compare password
        const match = await bcrypt.compare(data.password, user.password);

        if (match) {
          // Get private key
          const privateKey = fs.readFileSync('./secrets/private.pem', 'utf8');

          // Create JWT token
          const token = jwt.sign({ email: user.email }, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

          return token;
        }
      }
    }
    throw new Error('Wrong credentials');
  },

  async getUserFromToken(token) {
    // Get public key
    const publicKey = fs.readFileSync('./secrets/public.pem', 'utf8');
    token = token.replace(/^Bearer\s/, '');
    try {
      // Verify token
      const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      const user = await userRepository.findBy({ email: decoded.email });
      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

}