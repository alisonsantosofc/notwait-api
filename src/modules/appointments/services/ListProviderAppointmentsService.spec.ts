import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository
    );
  });

  it('Should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 9, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      providerId: 'provider-id',
      day: 20,
      year: 2022,
      month: 6,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
