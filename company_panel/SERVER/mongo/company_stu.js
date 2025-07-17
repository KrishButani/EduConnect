const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})


const company_stuschema = new mongoose.Schema({
    companyid: Number,
    stuid: Number,
  });
  
  const company_stumodel = mongoose.model("company_stu", company_stuschema);

module.exports = company_stumodel