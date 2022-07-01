import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '../../../app/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 5, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 10, 13),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('provider-id');
  });

  it('Should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2022, 6, 16, 15);

    await createAppointment.execute({
      providerId: 'provider-id',
      userId: 'user-id',
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        providerId: 'provider-id',
        userId: 'user-id',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shold not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        providerId: 'provider-id',
        userId: 'user-id',
        date: new Date(2022, 5, 10, 11),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shold not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        providerId: 'provider-id',
        userId: 'provider-id',
        date: new Date(2022, 5, 10, 13),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shold not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        providerId: 'provider-id',
        userId: 'user-id',
        date: new Date(2022, 5, 11, 7),
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        providerId: 'provider-id',
        userId: 'user-id',
        date: new Date(2022, 5, 11, 18),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
