import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

type Response = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: Request): Promise<Response> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        providerId,
        day,
        month,
        year,
      });

    const hourStart = 8;
    const currentDate = new Date(Date.now());

    const eachHourArray = Array.from(
      { length: 10 },
      (value, index) => index + hourStart
    );

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
