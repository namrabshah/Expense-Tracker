let expenss=require("express")
let routes=expenss.Router()

const expenssControllers=require("../controllers/expenssControllers")

routes.post("/addExpenss",expenssControllers.addExpenss)
routes.get("/getData",expenssControllers.getData)
routes.delete("/deleteExpenss",expenssControllers.deleteExpenss)
routes.put("/putExpness",expenssControllers.putExpenss)

module.exports=routes