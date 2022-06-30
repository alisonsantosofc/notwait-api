import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ userId });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
    };

    return res.json(userData);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { name, email, oldPassword, password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      userId,
      name,
      email,
      oldPassword,
      password,
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
    };

    return res.json(userData);
  }
}
