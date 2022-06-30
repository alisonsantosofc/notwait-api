import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '../services/ListProvidersService';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const providers = [{}];

    const listProviders = container.resolve(ListProvidersService);

    const users = await listProviders.execute({
      userId,
    });

    users.map((user) => {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        avatar: user.avatar,
      };

      providers.push(userData);
    });

    return res.json(providers);
  }
}
