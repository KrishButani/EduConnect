const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/Project")
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch(() => {
    console.log("DB connection failed");
  });

const addquestionsschema = new mongoose.Schema({
  qid: Number,
  qno: Number,
  question: String,
  trueoption: String,
  counter: Number, // Add a counter field to the schema
  op1: String,
  op2: String,
  op3: String,
  testid:Number,
});

const addquemodel = mongoose.model("questions", addquestionsschema);

module.exports = addquemodel;
