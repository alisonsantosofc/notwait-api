import { Router } from 'express';

import appointmentsRouter from '../../modules/appointments/routes/appointments.routes';
import providersRouter from '../../modules/appointments/routes/providers.routes';
import usersRouter from '../../modules/users/routes/users.routes';
import sessionsRouter from '../../modules/users/routes/sessions.routes';
import passwordRouter from '../../modules/users/routes/password.routes';
import profileRouter from '../../modules/users/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
