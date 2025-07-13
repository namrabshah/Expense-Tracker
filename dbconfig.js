let mongoose=require('mongoose')
mongoose.connect('mongodb+srv://namrashahimscit21:PLBMSgtNaBMGBbQ4@cluster0.vm3gy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

.then(()=>{
    console.log("database connect successfully")

})

.catch((err)=>{
    console.log("not connected",err)
})

