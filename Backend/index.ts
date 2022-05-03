import express from 'express'

const app= express();

app.use(express.json());

app.get("/",(req,res)=>{
    console.log(req.ip);

    return res.send(`<h1>From Server ${req.ip} </h1>`);
})
app.put("/update",(req,res)=>{

})
app.delete("/delete/:id",(req,res)=>{
    
})
app.listen(8000,()=>console.log('Listening at port 5000'));