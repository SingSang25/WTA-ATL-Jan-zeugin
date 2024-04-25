
import fs from 'fs';
import jwt from 'jsonwebtoken';

/**
 * Checks for an Authorization header and verifies the JWT token
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @returns 
 */

export default {
  auth(req, res, next) {
    // Check if Authorization header is present
    const authorizationheader = req.headers.authorization;
    if (!authorizationheader) {
      return res.status(401).send('Authorization header is required');
    }

    try {
      // Read public key
      const publicKey = fs.readFileSync('./secrets/public.pem', 'utf8');
      const token = authorizationheader.replace(/^Bearer\s/, '');
      // Verify token (will throw an error if invalid token, would return decoded token)
      jwt.verify(token, publicKey);
    } catch (error) {
      // Check if token is expired
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send('Token expired');
      }
      // Check if token is invalid
      return res.status(401).send('Invalid token');
    }

    // We get here if token is valid and not expired, call next to continue
    next();
  },

  isAdmin(req, res, next) {
    // Check if Authorization header is present
    const authorizationheader = req.headers.authorization;
    if (!authorizationheader) {
      return res.status(401).send('Authorization header is required');
    }

    try {
      // Read public key
      const publicKey = fs.readFileSync('./secrets/public.pem', 'utf8');
      const token = authorizationheader.replace(/^Bearer\s/, '');
      // Verify token (will throw an error if invalid token, would return decoded token)
      const decoded = jwt.verify(token, publicKey);
      if (decoded.isAdmin) {
        next();
      } else {
        return res.status(403).send('Forbidden');
      }
    } catch (error) {
      // Check if token is expired
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send('Token expired');
      }
      // Check if token is invalid
      return res.status(401).send('Invalid token');
    }
  }

}