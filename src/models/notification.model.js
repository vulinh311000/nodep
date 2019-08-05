import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    type: String,
    content: String,
    isRead: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now}
});

NotificationSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    removeRequestContactNotification(senderId, receiverId, type) {
        return this.deleteOne({
            senderId, receiverId, type
        }).exec();
    },
    getByUserIdAndLimit(userId, limit) {
        return this.find({
            receiverId: userId
        }).sort({createdAt: -1}).limit(limit).exec();
    }
};

export const NOTIFICATION_TYPES = {
    ADD_CONTACT: 'add_contact'
};

export const NOTIFICATION_CONTENTS = {
    getContent: (notificationType, isRead, userId, username, userAvatar) => {
        if (notificationType === NOTIFICATION_TYPES.ADD_CONTACT) {
            return `<span data-uid="${ userId }" ${ !isRead ? 'class="noti_readed_false"' : ''}>
                    <img class="avatar-small" src="images/users/${userAvatar}" alt="">
                    <strong>${username}</strong> đã gửi lời mời kết bạn!
                    </span><br><br><br>`;
        }
    }
};

export default mongoose.model("notification", NotificationSchema);
