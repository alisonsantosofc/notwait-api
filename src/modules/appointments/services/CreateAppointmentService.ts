import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '../../notifications/repositories/INotificationsRepository';

import AppError from '../../../app/errors/AppError';

interface Request {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({
    providerId,
    userId,
    date,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (userId === providerId) {
      throw new AppError(
        'It is not possible to create an appointment with yourself.'
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(
        'It is not possible to create an appointment on a past date.'
      );
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'It is not possible to create appointments before 8am and after 5pm.'
      );
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

    await this.notificationsRepository.create({
      content: `Novo agendamento para o dia ${dateFormatted}`,
      recipientId: providerId,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
