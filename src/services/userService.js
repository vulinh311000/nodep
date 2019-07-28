import UserModel from './../models/user.model';

export const updateUser = (id,item) => {
    return UserModel.updateUser(id,item);
};