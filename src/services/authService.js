import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import {transErrors} from "../../lang/vi";

const saltRounds = 7;

export const register = ({email, gender, password}) => {
    return new Promise(async (resolve, reject) => {
        const userByEmail = await UserModel.findByEmail(email);
        if (userByEmail) {
            return reject([transErrors.account_in_use]);
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const userItem = {
            username: email.split("@")[0],
            gender,
            local: {
                email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuid()
            }
        };

        const user = await UserModel.createNew(userItem);
        resolve(user);
    });

};
