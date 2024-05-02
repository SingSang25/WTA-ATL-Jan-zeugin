import userRepository from '../repository/userRepository.js';
import authService from '../service/authService.js';

/**
 * User Controller
 */
export default {
  /**
   * Get all users
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   */
  async getUsers(req, res) {
    const users = await userRepository.findAll();
    res.send(users);
  },

  /**
   * 
   * Get a single user by id
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   */
  async getUser(req, res) {
    const user = await userRepository.find(req.params.id);
    if (user === null) {
      res.status(404).send('User not found');
      return;
    }

    res.send(user);
  },

  /**
   * Create a user
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   */
  async createUser(req, res) {
    const user = req.body;
    try {
      const registeredUser = await authService.register(user, user.isAdmin);
      res.status(201).send(registeredUser);
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  /**
   * Update a single user by id
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   */
  async updateUser(req, res) {
    const user = req.body;

    if (user.password) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }

    try {
      await userRepository.update(req.params.id, user);
      res.status(200).send(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  /**
   * Delete a single user by id
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
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
      res.status(400).send(e.message);
    }
  },
};
