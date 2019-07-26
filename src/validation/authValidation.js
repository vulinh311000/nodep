import {check} from 'express-validator/check';
import {transValidation} from "../../lang/vi";

export const registerValidator = [
    check("email")
        .isEmail().withMessage(transValidation.email_incorrect)
        .trim(),
    check("gender")
        .isIn(['male', 'femate']).withMessage(transValidation.gender_incorrect),
    check("password")
        .isLength({min: 8}).withMessage(transValidation.password_min_incorrect)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/).withMessage(transValidation.password_incorrect),
    check("password_confirmation")
        .custom((value,{req}) => {
            return value === req.body.password;
        }).withMessage(transValidation.password_confirmation_incorrect)
];
