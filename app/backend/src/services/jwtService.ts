import jwt = require('jsonwebtoken') ;
import 'dotenv/config';

// const jwtSecret: string = process.env.JWT_SECRET || 'minhaSuperSenha';

export default class JwtService {
  static sign(payload: { id: number, email: string }): string {
    return jwt.sign(payload, 'minhaSuperSenha');
  }
}
