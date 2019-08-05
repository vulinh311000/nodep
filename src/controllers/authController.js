import {validationResult} from 'express-validator/check';
import {register, verifyAccount} from './../services/authService';
import {transSuccess} from "../../lang/vi";

export const getLoginRegister = (req, res) => {
    return res.render("auth/master", {
        errors: req.flash('errors'),
        success: req.flash('success')
    });
};

export const checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login-register');
    }
    next();
};

export const checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};

export const getLogout = (req, res) => {
    req.logout(); // remove session passport user
    req.flash("success", [transSuccess.logout_success]);
    return res.redirect('/login-register')
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
        const obj = Object.assign({}, req.body, {
            protocol: req.protocol,
            host: req.get("host")
        });

        await register(obj);
        req.flash("success", ["Tạo tài khoản thành công !"]);
    } catch (errors) {
        req.flash("errors", errors);
    }
    return res.redirect('/login-register');
};

export const getVerifyAccount = async (req, res) => {
    try {
        const verifySuccess = await verifyAccount(req.params.token);
        req.flash("success", verifySuccess);
        return res.redirect('/login-register');
    } catch (errors) {
        req.flash("errors", errors);
        return res.redirect('/login-register');
    }
};