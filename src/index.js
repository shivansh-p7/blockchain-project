const express = require("express")
const mongoose= require("mongoose")
const app = express()
const route = require("./routes/routes")


mongoose.connect("mongodb+srv://anjalis1509:anjalis1509@cluster0.rhdux0p.mongodb.net/blockchain",{
    useNewUrlParser : true
}).then(()=> {console.log("MongoDB is connected")})
.catch(err=> console.log(err))

app.use("/", route)

app.listen(process.env.PORT||3000 , ()=>{
console.log(`Server is running on port ${process.env.Port || 3000}`)
})