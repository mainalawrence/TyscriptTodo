import exprees from 'express';
const Route=exprees.Router();

import sql from "mssql";
import sqlConfig from '../Database'


Route.get("/", async(req,res)=>{
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
Route.put("/:id",async(req,res)=>{
    const{id}=req.params;
    console.log(id);
    
    try {
        let pool=await sql.connect(sqlConfig);
        let result=await pool.request()
        .query(`update todos set complete=${1} where id=${id}`);
        console.log(result);
        
        return res.json(result);
    } catch (error) {
        
    }

})
Route.delete("/:id",async(req,res)=>{
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
Route.post("/",async(req,res)=>{
try {
    
    const {id,title,details,complete,mdate,assignto}=req.body.data;    
    console.log(req.body.data);
    let pool=await sql.connect(sqlConfig);
        let result=await pool.request()
        .query(`insert into todos values(${id},'${title}','${details}',${complete ? 1:0},'${mdate}','${assignto}',${0});`)
        .catch(err=>{
             res.json(err);
        })
   
        return res.json(result);

} catch (error) { 

return res.json(error)      
}
})
export default Route;