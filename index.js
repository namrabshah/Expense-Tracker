const express=require("express")
const cors=require("cors")
let app=express()


app.use(express.json())
app.use(cors())

require("dotenv").config()
require("./dbconfig")

const expenss=require("./routes/expenssRoutes")
app.use("/expenss",expenss)

app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log("server start at 5000 port")
    }
    else{
        console.log(err)
    }
})