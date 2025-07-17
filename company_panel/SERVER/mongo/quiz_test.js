const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})




const quiz_testschema = new mongoose.Schema({
    qid: Number,
    tid: Number, // Add a counter field to the schema
  });
  
  const quiz_testmodel = mongoose.model("quiz_test", quiz_testschema);

module.exports = quiz_testmodel