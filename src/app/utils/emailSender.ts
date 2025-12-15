import nodemailer from "nodemailer";
import config from "../config";

interface IEmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

const transporter = nodemailer.createTransport({
    host: config.nodeMiller.email_host,
    port: Number(config.nodeMiller.email_port),
    secure: false,
    auth: {
        user: config.nodeMiller.email_user,
        pass: config.nodeMiller.email_pass,
    },
});

export const sendEmail = async (options: IEmailOptions) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};
