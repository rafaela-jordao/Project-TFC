import { NextFunction, Request, Response } from 'express';
import JwtService from '../services/jwtService';

// middleware de validação utilizado na rota /matches
export default class ValidateToken {
  static async token(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Error('token not found');
      error.name = 'UnauthorizedError';
      throw error;
    }

    JwtService.validateToken(authorization);
    next();
  }
}
