import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

import AppError from '../../../app/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('Should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'john_tre123@gmail.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('john_tre123@gmail.com');
  });

  it('Should not be able to update the profile from no existing user', async () => {
    await expect(
      updateProfile.execute({
        userId: 'no-existing-user',
        name: 'John Trê',
        email: 'john_tre123@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test007@gmail.com',
      password: '@test007',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'john_doe007@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'john_tre123@gmail.com',
      oldPassword: '@john007',
      password: '@john123',
    });

    expect(updatedUser.password).toBe('@john123');
  });

  it('Should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'john_tre123@gmail.com',
        password: '@john123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'john_tre123@gmail.com',
        oldPassword: 'wrong-old-password',
        password: '@john123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the profile from no existing user', async () => {
    await expect(
      updateProfile.execute({
        userId: 'no-existing-user',
        name: 'John Trê',
        email: 'john_tre123@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
