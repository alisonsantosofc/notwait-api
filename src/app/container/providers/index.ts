import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import IEmailProvider from './EmailProvider/models/IEmailProvider';
// import FakeEmailProvider from './EmailProvider/fakes/FakeEmailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

// container.registerSingleton<IEmailProvider>('EmailProvider', FakeEmailProvider);
