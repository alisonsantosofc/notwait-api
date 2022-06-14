import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
