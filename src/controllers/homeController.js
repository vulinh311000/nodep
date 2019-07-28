export const getHome = (req, res) => {
    return res.render("main/home/home", {
        success: req.flash("success"),
        user: req.user
    });
};
