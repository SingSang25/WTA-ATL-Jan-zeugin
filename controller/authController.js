import authService from '../service/authService.js';

/**
 * Auth Controller
 */
export default {
  /**
   * Register a new user
   * @param {import('express').Request} req The request object
   * @param {import('express').Response} res The response object
   */
  async register(req, res) {
    const data = req.body;
    if (data.email && data.password && data.userName) {
      try {
        await authService.register(data);
        return res.status(201).json({ message: 'User created' });
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    }

    return res.status(400).json({ message: 'Invalid data' });
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
      return res.status(400).json({ message: err.message });
    }
  },
}