import FakeEmailProvider from '../../../app/container/providers/EmailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

// import AppError from '../../../app/errors/AppError';

describe('Send Forgot Password Email', () => {
  it('Should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeEmailProvider = new FakeEmailProvider();

    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeEmailProvider
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'john_doe007@gmail.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });
});
