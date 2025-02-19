import nodemailer from "nodemailer";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const SERVER_PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${SERVER_PORT}`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendVerificationMail = async (email, username, token) => {
  const verificationLink = `${
    SERVER_URL || `http://localhost:${SERVER_PORT}`
  }/auth/verify/${token}`;
  await transporter.sendMail({
    from: `NutriGuiding <${process.env.USER_EMAIL}>`,
    to: `${username} <${email}>`,
    subject: "Verify account registration for NutriGuiding",
    html: `
      <h3>Dear ${username},</h3></br>
      <p>Click the link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
  });
};

export default sendVerificationMail;
