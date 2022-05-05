import express from 'express'
import dotenv from 'dotenv';
import cores from 'cors';
import sqlConfig from './Database'
import sql from "mssql";
dotenv.config();

const app= express();
app.use(cores())
app.use(express.json());

app.get("/", async(req,res)=>{
    try {
        const pool =await sql.connect(sqlConfig);
        let result= await pool.request()
        .query("select * from todos").then(data=>{
         return  res.json(data.recordset);
        })
     
    } catch (error) {
        return res.json({Error});
    }
})

app.put("/:id",async(req,res)=>{
    const{id}=req.params;
    const{data}=req.body;
    try {
        let pool=await sql.connect(sqlConfig);
        let result=await pool.request()
        .query(`update todos   title=${data.title} ,details=${data.details},complete=${data.complete},mdate=${data.mdate} where id=${id}`);
        return res.json(result);

        
    } catch (error) {
        
    }

})
app.delete("/:id",async(req,res)=>{
    const{id}=req.params;
    try {
        let pool=await sql.connect(sqlConfig);
        let result=await pool.request()
        .input('id', sql.Int,id)
        .query("Delete from todos where id=@id");
        return res.json(result);

    } catch (error) {
        res.json(error)
    }

})
app.post("/",async(req,res)=>{
try {
    const {id,title,details,complete,mdate}=req.body.data;            
    let pool=await sql.connect(sqlConfig);
        let result=await pool.request()
        .query(`insert into todos values(${id},'${title}','${details}',${complete ? 1:0},'${mdate}');`)
        .catch(err=>{
           
             res.json(err);
        })
        return res.json(result);

} catch (error) { 

return res.json(error)      
}
})
//connect to the database
const dbConnection=async()=>{
  try {
    await sql.connect(sqlConfig).then(con=>{
        if(con.connected){
            console.log("connected to the database"); 
        }
        }).catch(err=>{
            console.log(err);
            
        })
  } catch (error) {
      console.log(error);
      
  }
}

dbConnection();

const port=process.env.PORT||8001
app.listen(port,()=>console.log(`Listening at port ${port}`));