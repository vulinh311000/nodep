import dotenv from 'dotenv';
import passport from 'passport';
import passportFacebook from 'passport-facebook';
import UserModel from './../../models/user.model';
import {transErrors, transSuccess} from "../../../lang/vi";

dotenv.config();
const FacebookStratery = passportFacebook.Strategy;
const clientID = process.env.FB_APP_ID;
const clientSecret = process.env.FB_APP_SECRET;
const callbackURL = process.env.FB_CALLBACK_URL;

/**
 * Valid user account type: Facebook */
const initPassportFacebook = () => {
    passport.use(new FacebookStratery({
        clientID,
        clientSecret,
        callbackURL,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserModel.findByFacebookUid(profile.id);
            if (user) {
                return done(null, user, req.flash("success", transSuccess.login_success(user.facebook.email)))
            }
            console.log(profile);
            const newUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: {isActive: true},
                facebook: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
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

export default initPassportFacebook;
