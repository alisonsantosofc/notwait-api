import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
