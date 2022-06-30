import AppError from '../../../app/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    const userProfile = await showProfile.execute({
      userId: user.id,
    });

    expect(userProfile.name).toBe('John Doe');
    expect(userProfile.email).toBe('john_doe007@gmail.com');
  });

  it('Should not be able to show the profile from no existing user', async () => {
    expect(
      showProfile.execute({
        userId: 'no-existing-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
