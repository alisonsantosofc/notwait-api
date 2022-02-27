import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import uploadConfig from '../config/uploadFiles';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    const tmpFolder = uploadConfig.directory;

    if (!user) {
      throw new Error('User id does not exists or is invalid');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(tmpFolder, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
