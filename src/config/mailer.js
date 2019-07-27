import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';

dotenv.config();
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASSWORD;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;

const sendEmail = (to, subject, html) => {
    const transporter = nodeMailer.createTransport({
        host,
        port,
        secure: false,
        auth: {
            user,
            pass
        }
    });

    const options = {
        from: user,
        to,
        subject,
        html
    };

    return transporter.sendMail(options); // This is promise :D
};

export default sendEmail;