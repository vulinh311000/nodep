import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    phone: {type: Number, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: "avatar-default.jpg"},
    role: {type: String, default: "user"},
    local: {
        email: {type: String, trim: true},
        password: String,
        isActive: {type: Boolean, default: false},
        verifyToken: String
    },
    facebook: {
        uid: String,
        token: String,
        email: {type: String, trim: true}
    },
    google: {
        uid: String,
        token: String,
        email: {type: String, trim: true}
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null},
});

UserSchema.index({
    username: 'text',
    'local.email': 'text',
    'facebook.email': 'text',
    'google.email': 'text'
});

UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findByEmail(email) {
        return this.findOne({"local.email": email}).exec();
    },
    removeById(id) {
        return this.findByIdAndRemove(id).exec();
    },
    verify(token) {
        return this.findOneAndUpdate(
            {"local.verifyToken": token},
            {"local.isActive": true, "local.verifyToken": null}
        ).exec();
    },
    findUserById(id) {
        return this.findById(id).exec();
    },
    findByFacebookUid(uid) {
        return this.findOne({"facebook.uid": uid}).exec();
    },
    findByGoogleUid(uid) {
        return this.findOne({"google.uid": uid}).exec();
    },
    updateUser(id, item) {
        return this.findByIdAndUpdate(id, item).exec();
    },
    findAllForAddContact(deprecatedUserIds, keyword) {
        return this.find({
            $and: [
                {"_id": {$nin: deprecatedUserIds}},
                {"local.isActive": true},
                {
                    $or: [
                        {"username":{"$regex":new RegExp(keyword,"i")}},
                        {"local.email":{"$regex":new RegExp(keyword,"i")}},
                        {"facebook.email":{"$regex":new RegExp(keyword,"i")}},
                        {"google.email":{"$regex":new RegExp(keyword,"i")}},
                    ]
                }
            ]
        }).select("_id username address avatar").exec();
    }
};

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.local.password);
    }
};

module.exports = mongoose.model("user", UserSchema);
