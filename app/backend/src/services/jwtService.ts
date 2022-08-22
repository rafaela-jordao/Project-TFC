import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken';

import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

export default class JwtService {
  static createToken(payload: { email: string, password: string }) {
    const token = jwt.sign(payload, jwtSecret);
    return token;
  }

  static validateToken(token: string): JwtPayload {
    try {
      const verify = jwt.verify(token, jwtSecret);
      return verify as JwtPayload;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error;
    }
  }
}
