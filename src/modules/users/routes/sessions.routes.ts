import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();
const usersRepository = new UsersRepository();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const responseUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return response.json({ responseUser, token });
});

export default sessionsRouter;
