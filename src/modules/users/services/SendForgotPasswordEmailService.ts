import { inject, injectable } from 'tsyringe';

// import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IEmailProvider from '../../../app/container/providers/EmailProvider/models/IEmailProvider';

// import AppError from '../../../app/errors/AppError';

interface Request {
  email: string;
}

@injectable()
class ForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('EmailProvider')
    private emailProvider: IEmailProvider
  ) {}

  public async execute({ email }: Request): Promise<void> {
    this.emailProvider.sendEmail(
      email,
      'Seu pedido de recuperação de senha foi recebido.'
    );
  }
}

export default ForgotPasswordEmailService;
