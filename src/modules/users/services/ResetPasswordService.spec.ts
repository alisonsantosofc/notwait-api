import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

import AppError from '../../../app/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it('Should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      token,
      password: '@john123',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('@john123');
    expect(updatedUser?.password).toBe('@john123');
  });

  it('Should not be able to reset password with no existing token.', async () => {
    await expect(
      resetPassword.execute({
        token: 'no-existing-token',
        password: '@john123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset password with no existing user.', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'no-existing-user'
    );

    await expect(
      resetPassword.execute({
        token,
        password: '@john123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset password if passed more than 14 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 16);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '@john123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
