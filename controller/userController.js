import userRepository from '../repository/userRepository.js';
import authService from '../service/authService.js';
import bcrypt from "bcrypt";
/**
 * User Controller
 */
export default {
  /**
   * Alle Benutzer abrufen
   * @param {import('express').Request} req Das Anfrageobjekt
   * @param {import('express').Response} res Das Antwortobjekt
   */
  async getUsers(req, res) {
    try {
      const users = await userRepository.findAll();
      res.send(users);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  /**
   * Einen einzelnen Benutzer anhand seiner ID abrufen
   * @param {import('express').Request} req Das Anfrageobjekt
   * @param {import('express').Response} res Das Antwortobjekt
   */
  async getUser(req, res) {
    try {
      const user = await userRepository.find(req.params.id);
      if (user === null) {
        res.status(404).send('User not found');
        return;
      }
      res.send(user);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  /**
   * Einen Benutzer erstellen
   * @param {import('express').Request} req Das Anfrageobjekt
   * @param {import('express').Response} res Das Antwortobjekt
   */
  async createUser(req, res) {
    try {
      const user = req.body;
      const registeredUser = await authService.register(user, user.isAdmin);
      res.status(201).send(registeredUser);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  /**
   * Einen einzelnen Benutzer nach ID aktualisieren
   * @param {import('express').Request} req Das Anfrageobjekt
   * @param {import('express').Response} res Das Antwortobjekt
   */
  async updateUser(req, res) {
    try {
      const user = req.body;

      let serchUser = await userRepository.findBy({ username: user.username });
      if (serchUser !== null && serchUser.id !== user.id) {
        res.status(400).send('Username already in use');
        return;
      }

      serchUser = await userRepository.findBy({ email: user.email })
      if (serchUser !== null && serchUser.id !== user.id) {
        res.status(400).send('E-mail already in use');
        return;
      }

      if (user.password) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      }
      await userRepository.update(req.params.id, user);
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  /**
   * Einen einzelnen Benutzer nach ID löschen
   * @param {import('express').Request} req Das Anfrageobjekt
   * @param {import('express').Response} res Das Antwortobjekt
   */
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const userToDelete = await userRepository.find(userId);

      if (userToDelete.isAdmin === true) {
        res.status(403).send('Administrators cannot be deleted');
      } else {
        await userRepository.remove(userId);
        res.status(204).send('User deleted');
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
};
