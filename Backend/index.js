"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Database_1 = __importDefault(require("./Database"));
const mssql_1 = __importDefault(require("mssql"));
const Routers_1 = __importDefault(require("./Router/Routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(Routers_1.default);
//connect to the database
const dbConnection = async () => {
    await mssql_1.default.connect(Database_1.default).then(con => {
        if (con.connected)
            console.log("connected to the database");
    }).catch(err => console.log(err));
};
dbConnection();
const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Listening at port ${port}`));
