import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import {transErrors, transMail, transSuccess} from "../../lang/vi";
import sendMail from './../config/mailer';

const saltRounds = 7;

export const register = ({email, gender, password, protocol, host}) => {
    return new Promise(async (resolve, reject) => {
        const userByEmail = await UserModel.findByEmail(email);
        if (userByEmail) {
            return reject([transErrors.account_in_use]);
        }
        const username = email.split("@")[0];
        const salt = bcrypt.genSaltSync(saltRounds);
        const userItem = {
            username,
            gender,
            local: {
                email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuid()
            }
        };

        const user = await UserModel.createNew(userItem);
        const linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
        // Send email
        const mailTemplateConfig = {
            username,
            linkVerify,
            email,
            password
        };
        sendMail(email, transMail.subject, transMail.template(mailTemplateConfig))
            .then(success => {
                resolve(user);
            })
            .catch(async (error) => {
                await UserModel.removeById(user._id);
                console.log(error);
                reject(transMail.send_failed)
            });

    });

};

export const verifyAccount = (token) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.verify(token);
        if(user) resolve([transSuccess.account_active]);
        else reject(["Lỗi lầm !"]);
    });
};