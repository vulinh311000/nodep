import ContactModel from '../models/contact.model';

export const addNew = (currentUserId,contactId) => {
    return new Promise( async (resolve,reject) => {
        const contactExists = await ContactModel.checkExists(currentUserId,contactId);
        if(contactExists) return reject(false);

        const newContactItem  = {
            userId: currentUserId,
            contactId
        };

        const newContact = await ContactModel.createNew(newContactItem);
        return resolve(newContact);
    });
};

export const removeRequestContact = (currentUserId,contactId) => {
    return new Promise( async (resolve,reject) => {
        const removeReq = await ContactModel.removeRequestContact(currentUserId,contactId);
        if(removeReq.n === 0) {
            return reject(false);
        }
        return resolve(true);
    });
};