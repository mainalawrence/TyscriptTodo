"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Route = express_1.default.Router();
const mssql_1 = __importDefault(require("mssql"));
const Database_1 = __importDefault(require("../Database"));
Route.get("/", async (req, res) => {
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
Route.put("/:id", async (req, res) => {
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
Route.delete("/:id", async (req, res) => {
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
Route.post("/", async (req, res) => {
    try {
        const { id, title, details, complete, mdate, assignto } = req.body.data;
        console.log(req.body.data);
        let pool = await mssql_1.default.connect(Database_1.default);
        let result = await pool.request()
            .query(`insert into todos values(${id},'${title}','${details}',${complete ? 1 : 0},'${mdate}','${assignto}',${0});`)
            .catch(err => {
            res.json(err);
        });
        return res.json(result);
    }
    catch (error) {
        return res.json(error);
    }
});
exports.default = Route;
