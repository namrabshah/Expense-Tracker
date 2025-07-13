const expenssModel=require("../models/expenssModel")

const addExpenss=(req,res)=>{
    let expenssData=new expenssModel({
        name:req.body.name,
        price:req.body.price,
        cd:req.body.cd,
        dec:req.body.dec
    })
    expenssData.save()
    .then(()=>{
        res.send({
            msg:"expenss add sucessfully"
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getData=(req,res)=>{
    expenssModel.find()
    .then((data)=>{
        res.send({
            data:data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

const deleteExpenss=(req,res)=>{
    expenssModel.deleteOne({
        _id:req.query._id
    })
    .then((data)=>{
        res.send({
            data:data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

const putExpenss=(req,res)=>{
    expenssModel.updateOne(
        {_id:req.query._id},req.body
    )
    .then((data)=>{
        res.send({
            data:data
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports={addExpenss,getData,deleteExpenss,putExpenss}