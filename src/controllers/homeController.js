import UserModel from "../models/user.model";
import {getNotification} from "../services/notificationService";

export const getHome = async (req, res) => {
    const notifications = await getNotification(req.user._id);
    return res.render("main/home/home", {
        success: req.flash("success"),
        user: req.user,
        notifications
    });
};
