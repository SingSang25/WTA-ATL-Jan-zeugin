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
    const data = req.body;
    if (data.email && data.password && data.username) {
      try {
        await authService.register(data);
        return res.status(201).send('User created');
      } catch (err) {
        return res.status(400).send(err.message);
      }
    }

    return res.status(400).send('Invalid data');
  },

  /**
   * Login a user
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   * @returns {Promise<void>}
   */
  async login(req, res) {
    const data = req.body;
    try {
      const token = await authService.login(data);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },
}