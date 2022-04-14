import { Router } from 'express';

import appointmentsRouter from '../../modules/appointments/routes/appointments.routes';
import usersRouter from '../../modules/users/routes/users.routes';
import sessionsRouter from '../../modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
