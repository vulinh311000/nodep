import multer from 'multer';
import {app} from '../config/app';
import uuid from 'uuid/v4';
import {updateUser} from './../services/userService';
import fsExtra from 'fs-extra';

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

export const updateInfo = async (req,res) => {
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