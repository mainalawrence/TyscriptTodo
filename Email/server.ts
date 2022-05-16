import Express from "express";
import cron from 'node-cron';
import sql from "mssql";
import sqlConfig from "./Database/sqlConfig";
import emailService from "./BackgroundServices/email";
import dotenv from 'dotenv'
dotenv.config();

const EmailApp= Express();

const task= cron.schedule("*/2 * * * * *",async()=>{

    const pool= await sql.connect(sqlConfig)
    const request= await pool.request()
    .query(`select * from todos where emailed=0 `);
   request.recordset.map(async(item)=>{
    await emailService(item);
    const update=await pool.request().query(`update todos set emailed=${1} where id=${item.id}`)
   })
    
},{
    scheduled:false
})
 
task.start();
const dbConnection=async()=>{

    await sql.connect(sqlConfig).then(con=>{
        if(con.connected)  console.log("connected to the database")
        }).catch(err=>console.log(err))
}
dbConnection();

const port=process.env.EMAILPORT ||2001

EmailApp.listen(port,()=>console.log(`Email listening at port ${port}`));
