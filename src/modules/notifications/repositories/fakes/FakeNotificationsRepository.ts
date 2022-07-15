import { ObjectId } from 'mongodb';

import Notification from '../../schemas/Notification';
import INotificationsRepository from '../INotificationsRepository';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectId(), content, recipientId });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
