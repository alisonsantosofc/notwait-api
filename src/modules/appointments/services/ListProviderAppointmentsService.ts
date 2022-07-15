import { inject, injectable } from 'tsyringe';

import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: Request): Promise<Appointment[]> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        providerId,
        day,
        month,
        year,
      });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
