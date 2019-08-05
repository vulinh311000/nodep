import ContactModel from '../models/contact.model';
import NotificationModel, {NOTIFICATION_TYPES} from '../models/notification.model';

export const addNew = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        const contactExists = await ContactModel.checkExists(currentUserId, contactId);
        if (contactExists) return reject(false);

        const newContactItem = {
            userId: currentUserId,
            contactId
        };

        const newContact = await ContactModel.createNew(newContactItem);
        const notificationItem = {
            senderId: currentUserId,
            receiverId: contactId,
            type: NOTIFICATION_TYPES.ADD_CONTACT
        };
        await NotificationModel.createNew(notificationItem);
        // create notification
        return resolve(newContact);
    });
};

export const removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        const removeReq = await ContactModel.removeRequestContact(currentUserId, contactId);
        if (removeReq.n === 0) {
            return reject(false);
        }

        // remove notification
        await NotificationModel.removeRequestContactNotification(currentUserId, contactId, NOTIFICATION_TYPES.ADD_CONTACT);
        return resolve(true);
    });
};