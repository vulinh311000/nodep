import multer from 'multer';
import {app} from '../config/app';
import uuid from 'uuid/v4';
import {updateUser, searchUser} from './../services/userService';
import fsExtra from 'fs-extra';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';

const storageAvatar = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, app.avatar_directory);
    },
    filename: (req, file, callback) => {
        const math = app.avatar_type;
        if (math.indexOf(file.mimetype) === -1) {
            return callback("dinh dang ko dc chap nhan", null);
        }
        const avatarName = `${Date.now()}-${uuid()}-${file.originalname}`;
        callback(null, avatarName);
    }
});

const avatarUploadFile = multer({
    storage: storageAvatar,
    limits: {fileSize: app.avatar_size}
}).single("avatar");

export const updateAvatar = (req, res) => {
    avatarUploadFile(req, res, async (error) => {
        if (error) {
            if (error.message) {
                return res.status(500).send("File lon' hon 1 mb roi kia ");
            }
            return res.status(500).send(error);
        }
        try {
            const updateUserItem = {
                avatar: req.file.filename,
                updatedAt: Date.now()
            };
            // Update user
            const userUpdate = await updateUser(req.user._id, updateUserItem);

            // Remove old user avatar
            if (userUpdate.avatar !== 'avatar-default.jpg') await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`);

            return res.status(200).send({
                message: "Cập nhật thành công",
                imgSrc: `/images/users/${req.file.filename}`
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    });
};

export const updateInfo = async (req, res) => {
    try {
        const updateUserItem = req.body;
        // Update user
        const userUpdate = await updateUser(req.user._id, updateUserItem);

        return res.status(200).send({
            message: "Thay doi thong tin tai khoan thanh cong !"
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const updatePassword = async (req, res) => {
    try {
        const currentUser = await UserModel.findUserById(req.user._id);
        if (await currentUser.comparePassword(req.body.currentPassword)) {
            const salt = bcrypt.genSaltSync(7);
            const password = bcrypt.hashSync(req.body.newPassword, salt);
            await UserModel.findByIdAndUpdate(req.user._id, {
                "local.password": password
            });
            return res.status(200).send({
                message: "Thanh cong !"
            });
        } else {
            return res.status(500).send("Mat khau current ko dung");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const postSearchUser = async (req, res) => {
    const userSearch = await searchUser(req.body.search);
    return res.status(200).send(userSearch);
};