const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})


const test_studentschema = new mongoose.Schema({
    studentid:Number,
    testId:Number,
    score:Number,
  });
  
  const test_studentmodel = mongoose.model("test_student", test_studentschema);

  module.exports =test_studentmodel