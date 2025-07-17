const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})
// const hashedpassword =  bcrypt.hash(password, 10);


const registerschema = new mongoose.Schema({
    nm: String,
    email: String,
    password:String,
    counter: Number,
    contact: Number,
    address:String,
    yog:Number,
    dt:Date,
    
    // Add a counter field to the schema
  });
  
  const registermodel = mongoose.model("Register", registerschema);

  module.exports =registermodel