const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})


const subjectschema = new mongoose.Schema({
    nm: String,
    counter: Number,
    
  });
  
  const subjectemodel = mongoose.model("Subject", subjectschema);

  module.exports =subjectemodel