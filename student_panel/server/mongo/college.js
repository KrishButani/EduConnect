const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})


const collegeschema = new mongoose.Schema({
    counter: Number, // Add a counter field to the schema
    nm: String,
    clgid:String
  });
  
  const collegemodel = mongoose.model("College", collegeschema);

  module.exports =collegemodel