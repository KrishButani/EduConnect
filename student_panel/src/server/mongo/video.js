const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>{
    console.log("DATABASE CONNECTED SUCCESSFULLY")
})
.catch(()=>{
    console.log("DB connection failed")
})

const videoschema = new mongoose.Schema({
    title:String,
    desc: String,
    corid:Number,
    num:Number,
    id:Number,
    // counter: Number, // Add a counter field to the schema
  });
const videomodel = mongoose.model("video", videoschema);

module.exports = videomodel