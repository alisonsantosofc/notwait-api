import { inject, injectable } from 'tsyringe';

import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../app/errors/AppError';

interface Request {
  userId: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
