import passport from 'passport';
import passportLocal from 'passport-local';
import UserModel from './../../models/user.model';
import {transErrors, transSuccess} from "../../../lang/vi";

const LocalStratery = passportLocal.Strategy;

/**
 * Valid user account type: local */
const initPassportLocal = () => {
    passport.use(new LocalStratery({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            // Login failed
            const user = await UserModel.findByEmail(email);
            if (!user) return done(null, false, req.flash("errors", [transErrors.login_failed]));
            if (!user.local.isActive) return done(null, false, req.flash("errors", [transErrors.account_not_active]));
            const checkPassword = await user.comparePassword(password);
            if (!checkPassword) return done(null, false, req.flash("errors", [transErrors.login_failed]));
            // Login success
            return done(null, user, req.flash("success", transSuccess.login_success(email)));
        } catch (errors) {
            console.log(errors);
            return done(null, false, req.flash("errors", ["Server có vấn đề !"]));
        }
    }));

    // Save userIdt to session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // This is called by passport.session()
    // return User to req.user
    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
            .then(user => {
                return done(null, user);
            })
            .catch(errors => {
                return done(errors, null);
            })
    });
};

export default initPassportLocal;
