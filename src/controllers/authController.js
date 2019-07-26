import {validationResult} from 'express-validator/check';

export const getLoginRegister = (req, res) => {
    return res.render("auth/master");
};

export const getLogout = (req, res) => {
    return res.send("Log out");
};

export const postRegister = (req, res) => {
    const errorArr = [];
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        const errors = Object.values(validationErrors.mapped());
        errors.forEach(elm => {
            errorArr.push(elm.msg);
        });
        console.log(errorArr);
    }
    console.log(req.body);
};
