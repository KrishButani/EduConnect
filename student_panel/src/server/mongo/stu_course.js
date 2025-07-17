const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})




const stu_courseschema = new mongoose.Schema({
    studentid: Number,
    courseid: Number, // Add a counter field to the schema
  });
  
  const stu_coursemodel = mongoose.model("stu_course", stu_courseschema);

module.exports = stu_coursemodel