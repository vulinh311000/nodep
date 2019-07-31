import UserModel from "../models/user.model";

export const getHome = async (req, res) => {
    return res.render("main/home/home", {
        success: req.flash("success"),
        user: req.user
    });
};
