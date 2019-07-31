import UserModel from "../models/user.model";

export const getHome = async (req, res) => {
    const currentUser = await UserModel.findUserById(req.user._id);
    return res.render("main/home/home", {
        success: req.flash("success"),
        user: req.user
    });
};
