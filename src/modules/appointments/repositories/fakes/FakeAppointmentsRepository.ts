import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import Appointment from '../../entities/Appointment';
import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFound = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return appointmentFound;
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), providerId, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
