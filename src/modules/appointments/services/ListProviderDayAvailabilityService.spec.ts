import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('Should be able to list the day availability from provider', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 5, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      providerId: 'provider-id',
      day: 20,
      month: 6,
      year: 2022,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ])
    );
  });
});
