import { container } from 'tsyringe';

import './providers';
import '../../modules/users/providers';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointments/repositories/AppointmentsRepository';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/repositories/UsersRepository';

import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '../../modules/users/repositories/UserTokensRepository';

import INotificationsRepository from '../../modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '../../modules/notifications/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
);
