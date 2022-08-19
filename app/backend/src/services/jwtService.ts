import jwt = require('jsonwebtoken');

import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET || 'minhaSuperSenha';

export default class JwtService {
  static createToken(payload: { email: string, password: string }) {
    const token = jwt.sign(payload, jwtSecret);
    return token;
  }
}
