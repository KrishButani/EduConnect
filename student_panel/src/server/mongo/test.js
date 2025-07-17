const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/Project")
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch(() => {
    console.log("DB connection failed");
  });



  const testschema = new mongoose.Schema({
    test_title: String,
    score: Number,
    desc: String,
    minscore: Number,
    totque:Number,
    counter: Number, // Add a counter field to the schema
    corid: Number,
  });

const testmodel = mongoose.model("Test", testschema);

module.exports = testmodel;
