import { Router } from 'express';

import ensureAuthenticated from '../../../app/middlewares/ensureAuthenticated';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();

const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController();

const providerDayAvailabilityController =
  new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:providerId/month-availability',
  providerMonthAvailabilityController.index
);

providersRouter.get(
  '/:providerId/day-availability',
  providerDayAvailabilityController.index
);

export default providersRouter;
