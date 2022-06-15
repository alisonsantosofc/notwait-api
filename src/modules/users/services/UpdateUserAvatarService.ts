import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../app/errors/AppError';

import uploadConfig from '../../../config/uploadFiles';

interface Request {
  userId: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId, avatarFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    const tmpFolder = uploadConfig.directory;

    if (!user) {
      throw new AppError('User id does not exists or is invalid', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(tmpFolder, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
