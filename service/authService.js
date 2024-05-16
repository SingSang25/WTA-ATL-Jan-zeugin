import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import userRepository from '../repository/userRepository.js';

/**
 * AuthService
 */
export default {
  async register(data, isAdmin = false) {

    // Sind alle erforderlichen Felder vorhanden
    if (!data.email || !data.password || !data.username) {
      throw new Error('Invalid data');
    }

    // Prüfen Sie, ob die E-Mail bereits verwendet wird
    const existingUser = await userRepository.findBy({ email: data.email });
    if (existingUser !== null) {
      throw new Error('User already exists');
    }

    // Prüfen, ob der Benutzername bereits verwendet wird
    const existingusername = await userRepository.findBy({ username: data.username });
    if (existingusername !== null) {
      throw new Error('User already exists');
    }

    // Hash-Passwort
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;

    data.isAdmin = isAdmin;

    // Benutzer erstellen und speichern
    const registeredUser = await userRepository.create(data);
    return registeredUser;
  },

  /**
   * Meldet einen Benutzer an
   * @param {object} data Die Anmeldedaten
   * @returns {string} Der JWT-Token
   */
  async login(data) {
    if (!((data.email || data.username) && data.password)) {
      throw new Error('Wrong credentials');
    }

    let user; // Benutzer welcher sich anmelden möchte

    // Benutzer anhand der E-Mail oder des Benutzernamens suchen
    if (data.email) {
      user = await userRepository.findBy({ email: data.email });
    } else if (data.username) {
      user = await userRepository.findBy({ username: data.username });
    } else {
      throw new Error('Invalid data');
    }

    if (user === null) {
      throw new Error('User not found');
    }

    // Passwort vergleichen
    const match = await bcrypt.compare(data.password, user.password);

    if (match) {
      // Privaten Schlüssel abrufen
      const privateKey = fs.readFileSync('./secrets/private.pem', 'utf8');

      const data = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      };

      // JWT-Token erstellen
      const token = jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

      return token;
    } else {
      throw new Error('Wrong credentials');
    }
  },

  /**
   * Gibt den Benutzer zurück der sich mit dem Token authentifiziert hat
   * @param {string} token Der JWT-Token
   * @returns {User} Der Benutzer
   */
  async getUserFromToken(token) {
    // Öffentlichen Schlüssel abrufen
    const publicKey = fs.readFileSync('./secrets/public.pem', 'utf8');
    token = token.replace(/^Bearer\s/, '');
    try {
      // Token verifizieren
      const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      const user = await userRepository.findBy({ email: decoded.email });
      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

}