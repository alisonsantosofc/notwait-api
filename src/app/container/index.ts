import { container } from 'tsyringe';

import './providers';
import '../../modules/users/providers';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointments/repositories/AppointmentsRepository';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
