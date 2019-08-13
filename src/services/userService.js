import UserModel from './../models/user.model';
import ContactModel from './../models/contact.model';
import _ from 'lodash';

export const updateUser = (id, item) => {
    return UserModel.updateUser(id, item);
};

export const searchUser = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [currentUserId];
        const contactsByUser = await ContactModel.findAllByUser(currentUserId);
        contactsByUser.forEach(contact => {
            deprecatedUserIds.push(contact.userId);
            deprecatedUserIds.push(contact.contactId);
        });

        deprecatedUserIds = _.uniqBy(deprecatedUserIds);
        const users = await UserModel.findAllForAddContact(deprecatedUserIds,keyword);
        resolve(users);
    });
};
