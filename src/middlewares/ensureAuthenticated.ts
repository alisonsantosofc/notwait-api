import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/authentication';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const { secret } = authConfig.jwt;

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}

export default ensureAuthenticated;
