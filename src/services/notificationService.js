import NotificationModel, {NOTIFICATION_CONTENTS, NOTIFICATION_TYPES} from '../models/notification.model';
import UserModel from '../models/user.model';

const getNotification = (currentUserId, limit = 10) => {
    return new Promise(async (resolve, reject) => {
        try {
            const notifications = await NotificationModel.getByUserIdAndLimit(currentUserId, limit);
            // resolve(notifications);
            let getNotificationContent = notifications.map(async (notification) => {
                const sender = await UserModel.findUserById(notification.senderId);
                return NOTIFICATION_CONTENTS.getContent(notification.type, notification.isRead, sender._id,sender.username,sender.avatar);
            });

            resolve(await Promise.all(getNotificationContent));
        } catch (e) {
            reject(e);
        }
    });
}


const countNotiUnread = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notificationsUnread = await NotificationModel.countNotiUnread(currentUserId);
            resolve(notificationsUnread);
        } catch (e) {
            reject(e);
        }
    });
}

export {
    getNotification,
    countNotiUnread
}