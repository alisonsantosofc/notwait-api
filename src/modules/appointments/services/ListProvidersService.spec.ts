import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('Should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe007@gmail.com',
      password: '@john007',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'john_tre123@gmail.com',
      password: '@john123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'john_qua456@gmail.com',
      password: '@john456',
    });

    const users = await listProviders.execute({
      userId: loggedUser.id,
    });

    expect(users).toEqual([user1, user2]);
  });
});
