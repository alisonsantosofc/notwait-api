import { inject, injectable } from 'tsyringe';

import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '../../../app/container/providers/StorageProvider/models/IStorageProvider';

import AppError from '../../../app/errors/AppError';

interface Request {
  userId: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ userId, avatarFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
