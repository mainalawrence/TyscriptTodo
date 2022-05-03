"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    console.log(req.ip);
    return res.send(`<h1>From Server ${req.ip} </h1>`);
});
app.put("/update", (req, res) => {
});
app.delete("/delete/:id", (req, res) => {
});
app.listen(8000, () => console.log('Listening at port 5000'));
