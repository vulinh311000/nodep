import dotenv from 'dotenv';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';
import UserModel from './../../models/user.model';
import {transErrors, transSuccess} from "../../../lang/vi";

dotenv.config();
const GoogleStratery = passportGoogle.Strategy;
const clientID = process.env.GG_APP_ID;
const clientSecret = process.env.GG_APP_SECRET;
const callbackURL = process.env.GG_CALLBACK_URL;

/**
 * Valid user account type: Google */
const initPassportGoogle = () => {
    passport.use(new GoogleStratery({
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
        scope: ['https://www.googleapis.com/auth/userinfo.profile','email']
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findByGoogleUid(profile.id);
            if (user) return done(null, user, req.flash("success", transSuccess.login_success(user.username)));
            const newUserItem = {
                username: profile.email.split("@")[0],
                gender: profile.gender,
                local: {isActive: true},
                google: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile.email
                }
            };
            const newUser = await UserModel.createNew(newUserItem);
            return done(null, newUser, req.flash("success", transSuccess.login_success(newUser.username)));
        } catch (errors) {
            console.log(errors);
            return done(null, false, req.flash("errors", ["Server có vấn đề !"]));
        }
    }));

    // Save userIdt to session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

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

export default initPassportGoogle;
