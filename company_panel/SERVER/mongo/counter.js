const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})

const counterSchema = new mongoose.Schema({
    name: String,
    count: { type: Number, default: 0 },
  });
  
  const Counter = mongoose.model("Counter", counterSchema);

  module.exports =Counter