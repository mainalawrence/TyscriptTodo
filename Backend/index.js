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
dotenv_1.default.config();
const email_1 = __importDefault(require("./Emails/email"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", async (req, res) => {
    try {
        const pool = await mssql_1.default.connect(Database_1.default);
        let result = await pool.request()
            .query("select * from todos").then(data => {
            return res.json(data.recordset);
        });
    }
    catch (error) {
        return res.json({ Error });
    }
});
app.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        let pool = await mssql_1.default.connect(Database_1.default);
        let result = await pool.request()
            .query(`update todos set complete=${1} where id=${id}`);
        console.log(result);
        return res.json(result);
    }
    catch (error) {
    }
});
app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let pool = await mssql_1.default.connect(Database_1.default);
        let result = await pool.request()
            .input('id', mssql_1.default.Int, id)
            .query("Delete from todos where id=@id");
        return res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
app.post("/", async (req, res) => {
    try {
        const { id, title, details, complete, mdate, assignto } = req.body.data;
        console.log(req.body.data);
        let pool = await mssql_1.default.connect(Database_1.default);
        let result = await pool.request()
            .query(`insert into todos values(${id},'${title}','${details}',${complete ? 1 : 0},'${mdate}','${assignto}');`)
            .catch(err => {
            res.json(err);
        });
        await (0, email_1.default)(req.body.data);
        return res.json(result);
    }
    catch (error) {
        return res.json(error);
    }
});
//connect to the database
const dbConnection = async () => {
    try {
        await mssql_1.default.connect(Database_1.default).then(con => {
            if (con.connected) {
                console.log("connected to the database");
            }
        }).catch(err => {
            console.log(err);
        });
    }
    catch (error) {
        console.log(error);
    }
};
dbConnection();
const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Listening at port ${port}`));
