import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IEmailProvider from './EmailProvider/models/IEmailProvider';
import EtherealEmailProvider from './EmailProvider/implementations/EtherealEmailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  new EtherealEmailProvider()
);
