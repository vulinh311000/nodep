import UserModel from "../models/user.model";
import _ from 'lodash';

export const getHome = async (req, res) => {

    console.log(_.uniqBy(req.user._id));

    return res.render("main/home/home", {
        success: req.flash("success"),
        user: req.user
    });
};
