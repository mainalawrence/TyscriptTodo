"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createTransporter(config) {
    let transporter = nodemailer_1.default.createTransport(config);
    return transporter;
}
const configuration = {
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS
    }
};
const sendMailConfig = async (mailoption) => {
    console.log(configuration);
    const transporter = createTransporter(configuration);
    await transporter.verify();
    await transporter.sendMail(mailoption);
};
exports.default = sendMailConfig;
