import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('List Provider Month Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('Should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2022, 5, 21, 9, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'provider-id',
      year: 2022,
      month: 6,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    );
  });
});
