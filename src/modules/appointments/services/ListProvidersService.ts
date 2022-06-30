import { inject, injectable } from 'tsyringe';

import User from '../../users/entities/User';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface Request {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ userId }: Request): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      exceptUserId: userId,
    });

    return users;
  }
}

export default ListProvidersService;
