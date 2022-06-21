import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '../../../app/errors/AppError';

describe('Create Appointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      providerId: 'd0278543-fba5-4903-b53f-adaab930a60a',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('providerId');
    expect(appointment).toHaveProperty('date');
  });

  it('Should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2022, 6, 16, 15);

    await createAppointment.execute({
      providerId: 'd0278543-fba5-4903-b53f-adaab930a60a',
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        providerId: 'd0278543-fba5-4903-b53f-adaab930a60a',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
