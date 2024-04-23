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
      const registeredUser = await authService.register(user);
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
      await userRepository.remove(req.params.id);
      res.status(204).send('User deleted');
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  /**
   * Get the currently logged in user
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   */
  async getMe(req, res) {
    const tocken = req.headers.authorization;
    const user = authService.getUserFromToken(tocken);
    res.send(user);
  },

  /**
   * Update the currently logged in user
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   */
  async updateMe(req, res) {

    const tocken = req.headers.authorization;
    const user = req.body;
    const userDb = authService.getUserFromToken(tocken);

    if (!userDb.isAdmin) {
      res.status(403).send('Forbidden update user to admin');
      return;
    }

    try {
      await userRepository.update(user.id, user);
      res.status(200).send(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  },

  /**
   * Delete the currently logged in user
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   */
  async deleteMe(req, res) {
    const tocken = req.headers.authorization;
    const user = authService.getUserFromToken(tocken);

    try {
      await userRepository.remove(user.id);
      res.status(204).send('User deleted');
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
};
