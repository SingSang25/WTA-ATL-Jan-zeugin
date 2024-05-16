
import fs from 'fs';
import jwt from 'jsonwebtoken';

/**
 * Prüft, ob ein Autorisierungs-Header vorhanden ist und verifiziert das JWT-Token
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 * @returns 
 */
export default {
  auth(req, res, next) {
    // Prüfen, ob Autorisierungskopf vorhanden ist
    const authorizationheader = req.headers.authorization;
    if (!authorizationheader) {
      return res.status(401).send('Authorization header is required');
    }

    try {
      // Öffentlichen Schlüssel lesen
      const publicKey = fs.readFileSync('./secrets/public.pem', 'utf8');
      const token = authorizationheader.replace(/^Bearer\s/, '');
      // Verify token (gibt einen Fehler aus, wenn das Token ungültig ist, würde aber ein entschlüsseltes Token zurückgeben)
      jwt.verify(token, publicKey);
    } catch (error) {
      // Prüfen, ob das Token abgelaufen ist
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send('Token expired');
      }
      // Prüfen, ob Token ungültig ist
      return res.status(401).send('Invalid token');
    }

    // Wir kommen hierher, wenn das Token gültig und nicht abgelaufen ist, rufen Sie den nächsten Aufruf auf, um fortzufahren
    next();
  },

  isAdmin(req, res, next) {
    // Prüfen, ob Autorisierungskopf vorhanden ist
    const authorizationheader = req.headers.authorization;
    if (!authorizationheader) {
      return res.status(401).send('Authorization header is required');
    }

    try {
      // Öffentlichen Schlüssel lesen
      const publicKey = fs.readFileSync('./secrets/public.pem', 'utf8');
      const token = authorizationheader.replace(/^Bearer\s/, '');
      // Verify token (gibt einen Fehler aus, wenn das Token ungültig ist, würde aber ein entschlüsseltes Token zurückgeben)
      const decoded = jwt.verify(token, publicKey);
      if (decoded.isAdmin) {
        next();
      } else {
        return res.status(403).send('Forbidden');
      }
    } catch (error) {
      // Prüfen, ob das Token abgelaufen ist
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send('Token expired');
      }
      // Prüfen, ob Token ungültig ist
      return res.status(401).send('Invalid token');
    }
  }

}