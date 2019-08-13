import UserModel from "../models/user.model";
import {getNotification, countNotiUnread} from "../services/notificationService";

export const getHome = async (req, res) => {
    // only 10 items
    const notifications = await getNotification(req.user._id);
    // get amount notification unread
    const countNotiUnread_ = await countNotiUnread(req.user._id);
    return res.render("main/home/home", {
        success: req.flash("success"),
        user: req.user,
        notifications,
        countNotiUnread_
    });
};
