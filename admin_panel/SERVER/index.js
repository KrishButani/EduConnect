const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require('path');
const app = express();
const PORT = 8000
app.use(express.json());
app.use(cors());

const bodyParser=require("body-parser");
// const templatePath = path.join(__dirname.replace("server","src\\"))
const cookieParser = require("cookie-parser");
const OpenAIApi = require("openai");

// const { OpenAIApi } = require('openai');

const openai = new OpenAIApi({
  apiKey: 'YOUR_API_KEY_HERE'
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json());


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
const multer=require('multer');

// Define schema for counter collection
const counterSchema = new mongoose.Schema({
  name: String,
  count: { type: Number, default: 0 },
});

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

app.post("/chatbot", async(req,res) =>{
  const{ prompt } = req.body;
  const completion = await openai.completions.create({
      model:"davinci-002",
      max_tokens: 512,
      temperature: 0,
      prompt: prompt,
  });
  res.send(completion.data.choices[0].text);

  // res.send("Mitochondria are tiny structures found in cells, often referred to as the \"powerhouses\" of the cell because they produce energy. Just like how a power plant generates electricity for a city, mitochondria generate energy for the cell to function properly. This energy is in the form of a molecule called ATP (adenosine triphosphate), which is like a fuel that cells need to carry out various activities, such as moving, growing, and dividing.\nMitochondria have their own genetic material, separate from the cell's nucleus, and they can reproduce on their own. This suggests that they were once independent organisms that formed a symbiotic relationship with larger cells billions of years ago. Because of this unique feature, mitochondria are often referred to as the \"powerhouses\" or \"energy factories\" of the cell.\nIn summary, mitochondria are important organelles in cells that produce energy in the form of ATP, allowing cells to carry out their functions and activities.");
})

app.listen(PORT, () => {
  console.log('server is running on ',{PORT});
});


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



app.post('/videoupload',upload_video.single('file'),async (req, res) => {
  
  console.log(req.body);
  console.log(req.file);
  try {
    const count = await incrementCounter("video");
    console.log(req.body)
    req.body.id = count; // Assign the counter value to the record
    const project = await videomodel.create(req.body);
    // res.json(project);
    res.send('UPLOADED!!!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


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
        subid: count // Use the subject ID as subid
      });
      projects.push(subFieldDoc);
    }

    res.json({ subject: subjectDoc, subFields: projects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/getQue", cors(), async (req, res) => {
  console.log("called");
  
    res.sendFile(__dirname + "/questions.json");
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
});

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

// Collge GET and POST
app.post("/college", cors(), async (req, res) => {
  try {
    const count = await incrementCounter("College");
    req.body.counter=count;
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

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
