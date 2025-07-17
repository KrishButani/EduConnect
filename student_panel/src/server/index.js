const random = require('random-js')
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require('path');

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
const videomodel = require("./mongo/video");
const stu_coursemodel  = require("./mongo/stu_course")
// const course_tutormodel = require("./mongo/course_tutor");
const testmodel = require("./mongo/test");
// const test_coursemodel = require("./mongo/test_course");

const addquemodel = require("./mongo/addquestions")
const test_studentmodel = require("./mongo/test_studentmodel")
// Define schema for counter collection
const counterSchema = new mongoose.Schema({
  name: String,
  count: { type: Number, default: 0 },
});

const multer=require('multer');
const storage_video = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./videoupload");
  },
  filename: async (req, file, callback) => {
    try {
      const count = await incrementCounter("video");
      req.body.counter = count;
      const originalname = file.originalname;
      const extension = originalname.split('.').pop(); // Extract extension
      const filename = `${count}.${extension}`;
      console.log(req.body);
      callback(null, filename);
    } catch (err) {
      callback(err, null);
    }
  },
});

const upload_video = multer({ storage: storage_video });

const storage_tutor = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tutorimage");
  },
  filename: async (req, file, callback) => {
    try {
      const count = await incrementCounter("Tutor");
      req.body.counter = count;
      const originalname = file.originalname;
      const extension = originalname.split('.').pop(); // Extract extension
      const filename = `${count}.${extension}`;
      console.log(req.body);
      callback(null, filename);
    } catch (err) {
      callback(err, null);
    }
  },
});

const upload_tutor = multer({ storage: storage_tutor });

// Courses image storage configuration
const storage_course = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./courseimage");
  },
  filename: async (req, file, callback) => {
    try {
      const count = await incrementCounter("Courses");
      req.body.counter = count;
      const originalname = file.originalname;
      const extension = originalname.split('.').pop(); // Extract extension
      const filename = `${count}.${extension}`;
      console.log(req.body);
      callback(null, filename);
    } catch (err) {
      callback(err, null);
    }
  },
});

const upload_course = multer({ storage: storage_course });




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

app.listen(4001, () => {
  console.log("server is running on 4001");
});

// GET and POST Course
app.post('/courseimage',upload_course.single('file'),async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const count = await incrementCounter("Courses");
    console.log(req.body)
    req.body.counter = count; // Assign the counter value to the record
    const project = await coursemodel.create(req.body);
    // res.json(project);
    res.send('UPLOADED!!!');
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

// app.post('/videoupload',upload_video.single('file'),async (req, res) => {
  
//   console.log(req.body);
//   console.log(req.file);
//   try {
//     const count = await incrementCounter("video");
//     console.log(req.body)
//     req.body.id = count; // Assign the counter value to the record
//     const project = await videomodel.create(req.body);
//     // res.json(project);
//     res.send('UPLOADED!!!');
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



app.post("/addstu_course", cors(), async (req, res) => {
  try {
      const { counter, stdid } = req.body;
      console.log(req.body);
      const project = await stu_coursemodel.create({
          studentid: stdid,
          courseid: counter,
      });
      res.json(project); // Send response with created project
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
});

// Tutor GET and POST
app.post('/tutorimage',upload_tutor.single('file'),async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    // const count = await incrementCounter("Tutor");
    console.log(req.body.nm)
    // req.body.counter = count; //Assign the counter value to the record
    console.log(req.body)
    const project = await tutormodel.create(req.body);
    // res.json(project);
    res.send('UPLOADED!!!');
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

app.post("/getMyCourse", async (req, res) => {
  const counter = req.body.counter; 
  let cou = await coursemodel.findOne({ counter });
  // console.log("hiii   "+ cou)
  res.json(cou)
});

app.post("/getMyVideo", async (req, res) => {
  const corid = req.body.counter; 
  let cou = await videomodel.find({ corid });
  // console.log("hiii   "+ cou)
  res.json(cou)
});

app.post("/getMyQuiz", async (req, res) => {
  const corid = req.body.counter; 
  let cou = await testmodel.find({ corid });
  console.log("hiii  aaa "+ cou)
  res.json(cou)
});

app.get("/quiz", cors(), async (req, res) => {
  console.log("calledqueapi2");
  const testid = req.query.testid; // Extract testid from query parameters
  
  try {
    // Fetch the test from the database to get the 'totque' attribute
    const test = await addquemodel.findOne({ testid });
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }
    let testdetail = await testmodel.findOne({ counter:testid });

    try {
      if (testdetail) {
        console.log("test detail Is:", testdetail.test_title);
      } else {
        console.log("No test detail found with testid 4");
      }
    } catch (error) {
      console.error("Error occurred while fetching test detail:", error);
    }

    const totque = testdetail.totque;

    console.log("tot que is:", totque);
    // const questions = await addquemodel.find({ testid }).limit(totque);
    // res.json(questions);
    
    const allQuestions = await addquemodel.find({ testid });
    
    const shuffledQuestions = shuffleArray(allQuestions);
    
    const selectedQuestions = shuffledQuestions.slice(0, totque);
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    res.json(selectedQuestions);
    
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/test_student", cors(), async (req, res) => {
  try {
    console.log("invoked test stu");
    // Assign the counter value to the record
    const project = await test_studentmodel.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/setquiz", cors(), async (req, res) => {
  // console.log(req.body)
  const testid = req.body.e; // Assuming testid is sent in the request body
  console.log(testid)
  res.redirect(`/quiz?testid=${testid}`);
});

app.post("/registration", async (req, res) => {
  const { nm, email, password, address, contact, yog, dt } = req.body;
  let user = await registermodel.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "same" });
  }

  try {
    // Hashed password
    const hashedpassword = await bcrypt.hash(password, 10);
    const count = await incrementCounter("register");
    req.body.counter = count;
    user = await registermodel.create({
      nm: nm,
      email: email,
      password: hashedpassword,
      address: address,
      contact: contact,
      yog: yog,
      dt: dt,
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
    let user = await registermodel.findOne({ email });
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
    
    res.status(200).json({ message: "Login successful" , cookiee: user.counter });
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


