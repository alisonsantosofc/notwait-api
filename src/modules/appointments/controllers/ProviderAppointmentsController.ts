import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '../services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const providerId = req.user.id;
    const { day, month, year } = req.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointments.execute({
      providerId,
      day,
      month,
      year,
    });

    return res.json(appointments);
  }
}
