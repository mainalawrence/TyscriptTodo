import express from 'express'
import dotenv from 'dotenv';
import cores from 'cors';
import sqlConfig from './Database'
import sql from "mssql";
import Route from './Router/Routers';
dotenv.config();

const app= express();
app.use(cores())
app.use(express.json());
app.use(Route);

//connect to the database
const dbConnection=async()=>{

    await sql.connect(sqlConfig).then(con=>{
        if(con.connected)  console.log("connected to the database")
        }).catch(err=>console.log(err))
}
dbConnection();

const port=process.env.PORT||8001
app.listen(port,()=>console.log(`Listening at port ${port}`));
