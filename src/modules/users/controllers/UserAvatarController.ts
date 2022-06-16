import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      userId: req.user.id,
      avatarFileName: req.file?.filename as string,
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
    };

    return res.json({ user: userData });
  }
}
