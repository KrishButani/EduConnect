const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})




const sub_fieldschema = new mongoose.Schema({
    subid: Number,
    fid: Number, // Add a counter field to the schema
  });
  
  const sub_fieldemodel = mongoose.model("sub_field", sub_fieldschema);

module.exports = sub_fieldemodel