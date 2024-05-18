import authService from '../service/authService.js';

/**
 * Auth Controller
 */
export default {
  /**
   * Register a new user
   * @param {import('express').Request} req Das Anfrageobjekt
   * @param {import('express').Response} res Das Antwortobjekt
   */
  async register(req, res) {
    try {
      const data = req.body;
      if (data.email && data.password && data.username) {
        await authService.register(data);
        return res.status(201).send('User created');
      }
      return res.status(400).send('Invalid data');
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  /**
   * Login a user
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   * @returns {Promise<void>}
   */
  async login(req, res) {
    try {
      const data = req.body;
      const token = await authService.login(data);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
}