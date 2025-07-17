const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Project")

const quizschema = new mongoose.Schema({
    counter:Number,
    qname : String,
    question : String,
    top : String,
    op1 : String,
    op2 : String,
    op3 : String,
    // Add a counter field to the schema
  });
  
  const quizmodel = mongoose.model("Quiz", quizschema);

  module.exports = quizmodel;

