const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})


const companyschema = new mongoose.Schema({
    companyid: Number, // Add a counter field to the schema
    nm: String,
    email:String,
    cotact:Number,
    address:String,
    password:String,

  });
  
  const companymodel = mongoose.model("Companies", companyschema);

  module.exports =companymodel