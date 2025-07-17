const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})




const fieldschema = new mongoose.Schema({
    nm: String,
    counter: Number, // Add a counter field to the schema
  });
  
  const fieldemodel = mongoose.model("Field", fieldschema);

module.exports = fieldemodel