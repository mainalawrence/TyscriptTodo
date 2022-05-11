"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const custom_1 = __importDefault(require("./Templates/custom"));
const config_1 = __importDefault(require("./config"));
const emailService = async (Todos) => {
    ejs_1.default.renderFile("./Templates/todo.ejs", { Todos: Todos }, async (err, data) => {
        const mailoptions = {
            from: process.env.EMAIL,
            to: `${Todos.assignto}`,
            subject: 'Assigned Todo Task',
            text: `${Todos.details}`,
            html: (0, custom_1.default)(Todos)
        };
        console.log(err);
        try {
            await (0, config_1.default)(mailoptions);
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.default = emailService;
