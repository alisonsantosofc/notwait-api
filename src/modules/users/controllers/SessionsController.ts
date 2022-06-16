import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
    };

    return res.json({ user: userData, token });
  }
}
