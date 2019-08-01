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
        return this.find({userId}).exec();
    }
};

module.exports = mongoose.model("contact", ContactSchema);
