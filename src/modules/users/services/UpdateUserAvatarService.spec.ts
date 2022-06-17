import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '../../../app/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

// import AppError from '../../../app/errors/AppError';

describe('Update User Avatar', () => {
  it('Should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpeg',
    });

    expect(user).toHaveProperty('id');
  });
});
