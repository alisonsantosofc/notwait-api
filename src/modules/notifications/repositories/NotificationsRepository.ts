import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '../schemas/Notification';
import INotificationsRepository from './INotificationsRepository';
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongodb');
  }

  public async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipientId });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
