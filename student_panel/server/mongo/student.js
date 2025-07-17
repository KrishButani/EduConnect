const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})


const studentschema = new mongoose.Schema({
    counter: Number,
    nm: String,
    yog: Number,
    pass: String,
    dt: Date,
    mail: String,
    con: Number,
    ad: String,
    cid:Number,
    fid:Number
  });
  
  const studentmodel = mongoose.model("Student", studentschema);

  module.exports =studentmodel