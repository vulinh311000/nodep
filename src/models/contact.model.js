import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

ContactSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findAllByUser(userId) {
        return this.find({
            $or: [
                {
                    userId,
                },
                {
                    "contactId": userId
                }
            ]
        }).exec();
    },
    /*
    * Check exists
    * @param {string} userId
    * @param {string} contactId */
    checkExists(userId, contactId) {
        return this.findOne({
            $or: [
                {
                    $and: [
                        {userId},
                        {contactId}
                    ]
                },
                {
                    $and: [
                        {userId: contactId},
                        {contactId: userId}
                    ]
                }
            ]
        }).exec();
    },
    removeRequestContact(userId, contactId) {
        return this.deleteOne({
            userId, contactId
        }).exec();
    }
};

module.exports = mongoose.model("contact", ContactSchema);
