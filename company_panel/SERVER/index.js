const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const cookieParser = require("cookie-parser");
const Jwt = require("jsonwebtoken");
mongoose.connect("mongodb://127.0.0.1:27017/Project");
const collegemodel = require("./mongo/college");
const coursemodel = require("./mongo/course");
const fieldemodel = require("./mongo/field");
const studentmodel = require("./mongo/student");
const tutormodel = require("./mongo/tutor");
const subjectemodel = require("./mongo/subject");
const registermodel = require("./mongo/register");
const sub_fieldmodel = require("./mongo/sub_field");
const companymodel = require("./mongo/companies");
const Compregmodel = require("./mongo/companyreg");
// const course_tutormodel = require("./mongo/course_tutor");
const testmodel = require("./mongo/test");
// const test_coursemodel = require("./mongo/test_course");
const addquemodel = require("./mongo/addquestions")

// Define schema for counter collection
const counterSchema = new mongoose.Schema({
  name: String,
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// Middleware to increment counter
const incrementCounter = async (modelName) => {
  try {
    let counter = await Counter.findOne({ name: modelName }).exec();
    if (!counter) {
      counter = new Counter({ name: modelName });
    }
    counter.count++;
    await counter.save();
    return counter.count;
  } catch (error) {
    console.error("Error incrementing counter:", error);
    throw error;
  }
};

app.listen(6001, () => {
  console.log("server is running on 6001");
});

// GET and POST Course
app.post("/course", cors(), async (req, res) => {
  try {
    const { nm, desc, dd, subid, clgid, tutid } = req.body;
    const count = await incrementCounter("Courses");
    req.body.counter = count; // Assign the counter value to the record
    const project = await coursemodel.create({
      nm: nm,
      desc: desc,
      dd: dd,
      subid: subid,
      counter: count,
    });
    const project2 = await course_tutormodel.create({
      cid: count,
      tutid: tutid,
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getCourse", cors(), async (req, res) => {
  console.log("called");
  try {
    const allData = await coursemodel.find();
    res.json(allData);
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

app.post("/subject", async (req, res) => {
  try {
    const { nm, selectedOptions } = req.body;

    // Create a document in subjectmodel
    const count = await incrementCounter("Subject");
    const subjectDoc = await subjectemodel.create({
      nm: nm,
      counter: count,
    });

    // Create documents in sub_fieldmodel for each selected option
    const projects = [];
    for (const option of selectedOptions) {
      const subFieldDoc = await sub_fieldmodel.create({
        fid: option.value,
        subid: count, // Use the subject ID as subid
      });
      projects.push(subFieldDoc);
    }

    res.json({ subject: subjectDoc, subFields: projects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getSubject", cors(), async (req, res) => {
  console.log("called");
  try {
    const allData = await subjectemodel.find();
    res.json(allData);
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

// Field GET AND POST
app.post("/field", cors(), async (req, res) => {
  try {
    const count = await incrementCounter("Field");
    req.body.counter = count; // Assign the counter value to the record
    const project = await fieldemodel.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getField", cors(), async (req, res) => {
  console.log("called2");
  try {
    const allData = await fieldemodel.find();
    res.json(allData);
  } catch (e) {
    res.json("fail");
    console.log(e);
  }

  app.post("/getSubj",cors(),async(req,res)=>{
    const {field} = req.body
    console.log("hiii")
    
    const subjectsInField = await sub_fieldmodel.find({fid: field}).select('subid');
    
    const subjectIds = subjectsInField.map(subid => subid.subid);

    const subjects = await subjectemodel.find({ counter: { $in: subjectIds } });
    // const subjects = await subjectemodel.find({ counter: { $in: subjectsInField } });

    res.json(subjects);
  })

  app.post("/getCou",cors(),async(req,res)=>{
    const {subject} = req.body
    
    const course = await coursemodel.find({subid: subject})
  

    res.json(course);
  })

});



// Tutor GET and POST
app.post("/tutor", cors(), async (req, res) => {
  try {
    const count = await incrementCounter("Tutor");
    req.body.counter = count; // Assign the counter value to the record
    const project = await tutormodel.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/gettutor", cors(), async (req, res) => {
  console.log("called");
  try {
    const allData = await tutormodel.find();
    res.json(allData);
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

// Collge GET and POST
app.post("/college", cors(), async (req, res) => {
  try {
    const count = await incrementCounter("College");

    const project = await collegemodel.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/getCollege", cors(), async (req, res) => {
  console.log("called");
  try {
    const allData = await collegemodel.find();
    res.json(allData);
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

app.post("/student", cors(), async (req, res) => {
  try {
    const count = await incrementCounter("College");
    req.body.counter = count; // Assign the counter value to the record
    const project = await studentmodel.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/registration", async (req, res) => {
  const { nm, email, password, address, contact, } = req.body;
  let user = await Compregmodel.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "same" });
  }

  try {
    // Hashed password
    const hashedpassword = await bcrypt.hash(password, 10);
    const count = await incrementCounter("Compreg");
    req.body.counter = count;
    user = await Compregmodel.create({
      nm: nm,
      email: email,
      password: hashedpassword,
      address: address,
      contact: contact,
      counter: count,
    });

    console.log(user);
    const token = Jwt.sign({ _id: user._id }, "educonnect");
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.message("Success");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", cors(), async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await Compregmodel.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please register." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = Jwt.sign({ _id: user._id }, "educonnect");
    // const token = Jwt.sign({ _id: user._id }, jwtSecret);
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET and POST Test
app.post("/test", cors(), async (req, res) => {
  try {
    const { nm, desc, scr, minscr, position, cid } = req.body;
    const count = await incrementCounter("Test");
    req.body.counter = count; // Assign the counter value to the record
    const project = await testmodel.create({
      test_title: nm,
      desc: desc,
      score: scr,
      counter: count,
      minscore: minscr,
    });
    const project2 = await test_coursemodel.create({
      course_id: cid,
      test_id: count,
      position: position,
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/gettest", cors(), async (req, res) => {
  console.log("calledtestapi");
  try {
    const allData = await testmodel.find();
    res.json(allData);
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

// POST addquestions
app.post("/addquestions", cors(), async (req, res) => {
  try {
    const { qno,question,trueoption,op1,op2,op3,testid } = req.body;
    const count = await incrementCounter("Questions");
    req.body.counter = count; // Assign the counter value to the record
    const project = await addquemodel.create({
     qid:count,
     qno:qno,
     question:question,
     trueoption:trueoption,
     op1:op1,
     op2:op2,
     op3:op3,
     testid:testid,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add this API endpoint to server.js

app.get("/viewstudent", cors(), async (req, res) => {
  try {
    const allStudents = await registermodel.find();
    res.json(allStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
