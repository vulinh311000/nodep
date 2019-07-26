import {validationResult} from 'express-validator/check';
import {register} from './../services/authService';

export const getLoginRegister = (req, res) => {
    return res.render("auth/master", {
        errors: req.flash('errors'),
        success: req.flash('success')
    });
};

export const getLogout = (req, res) => {
    return res.send("Log out");
};

export const postRegister = async (req, res) => {
    const errorArr = [];
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = Object.values(validationErrors.mapped());
        errors.forEach(elm => {
            errorArr.push(elm.msg);
        });
        req.flash("errors", errorArr);
        return res.redirect('/login-register');
    }
    try {
        await register(req.body);
        req.flash("success", ["Tạo tài khoản thành công !"]);
    } catch (errors) {
        req.flash("errors", errors);
    }
    return res.redirect('/login-register');
};
