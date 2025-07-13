let mongoose=require("mongoose")

let expenssModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    cd:{
        type:String,
        required:true
    },
    dec:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("expenssModel",expenssModel)