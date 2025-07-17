// import React, { useState, useEffect } from "react";
// import axios from 'axios'
// import Sidebar from "../components/sidebar";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// function Company() {
  
//   const[qname,setqname]=useState('')
//   const [info, setInfo] = useState([]);
//   const[question,setque]=useState('')
//   const[top,settop]=useState('')
//   const[op1,setop1]=useState('')
//   const[op2,setop2]=useState('')
//   const[op3,setop3]=useState('')
//   const [selectedOptions, setSelectedOptions] = useState([]);
    

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/gettest");
//         setInfo(response.data);
//       } catch (error) {
//         // alert("Failed to fetch data");
//       }
//     };

//     fetchData();
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/getfield");
//         setInfo(response.data);
//       } catch (error) {
//         // alert("Failed to fetch data");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSelectChange = (e) => {
//     const selected = Array.from(e.target.selectedOptions, (option) => ({
//       value: option.value,
//       name: option.getAttribute("name"),
//     }));
//     setSelectedOptions(selected);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:6001/quiz", {
//         qname,question,top,op1,op2,op3,
//         selectedOptions,
//       });
//       alert("Data sent successfully!");
//     } catch (error) {
//     //   alert("Failed to send data.");
//     }
//   };

// {
      
      
// };
//     return (
//         <div className="App">
//         <Sidebar />
//         <section className="main_content dashboard_part large_header_bg">
//           <Header />      
          
      
//       <div className="wrapper wrapper--w790">
//             <div className="card card-5">
//                 <div className="card-heading">
//                     <h2 className="title">Add New Quiz</h2>
//                 </div>
//                 <div className="card-body">
//                     <form method="POST">
//                         <div className="form-row m-b-55">
                           
//                         </div>
                 
//                         <div>
//                             <button className="btn btn--radius-2 btn--red" type="submit" onClick={handleSubmit} name="submit" id="submit">ADD</button>
//                         </div>
//                     </form>
//                 </div>  
//             </div>
//         </div>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//         <Footer />
//         </section>
//       </div>
//     );
//   }
  
//   export default Company;

// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import Sidebar from "../components/sidebar";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// function Company() {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:6001/viewstudent");
//         setStudents(response.data);
//       } catch (error) {
//         console.log("Failed to fetch data");
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <Sidebar />
//       <section className="main_content dashboard_part large_header_bg">
//         <Header />
//         <div className="wrapper wrapper--w790">
//           <div className="card card-5">
//             <div className="card-heading">
//               <h2 className="title">Student Details</h2>
//             </div>
//             <div className="card-body">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Year of Graduation</th> 
//                     <th>Email</th>
//                     <th>Contact</th>
//                     <th>Address</th>
//                     <th>Course</th>
//                     <th>Field</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map(student => (
//                     <tr key={student._id}>
//                       <td>{student.nm}</td>
//                       <td>{student.yog}</td>
//                       <td>{student.email}</td>
//                       <td>{student.contact}</td>
//                       <td>{student.address}</td>
//                       <td>{student.cid}</td>
//                       <td>{student.fid}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <br />
//         <br />
//         <br />
//         <br />
//         <Footer />
//       </section>
//     </div>
//   );
// }

// export default Company;



import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Company() {
  const [courses, setCourses] = useState([]);
  const [fields, setFields] = useState([]);
  const [subject, setSelectedSubject] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var courseResponse = await axios.get("http://localhost:6001/getCourse");
        setCourses(courseResponse.data);

        var subjectResponse = await axios.get("http://localhost:6001/getSubject");
        setSelectedSubject(subjectResponse.data);


        var fieldResponse = await axios.get("http://localhost:6001/getField");
        setFields(fieldResponse.data);
      } catch (error) {
        console.log("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  async function setcou (){
    var courseResponse = await axios.post("http://localhost:6001/getCou",{
      subject
    })
        setSelectedCourse(courseResponse.data);
      }

      async function setSubj(){
        var subjectResponse = await axios.post("http://localhost:6001/getSubj",{
          fields
        })
            setSelectedSubject(subjectResponse.data);
        }

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:6001/viewstudents?course=${selectedCourse}&field=${selectedField}`);
      setStudents(response.data);
    } catch (error) {
      console.log("Failed to fetch student data");
    }
  };

  return (
    <div className="App">
      <Sidebar />
      <section className="main_content dashboard_part large_header_bg">
        <Header />
        <div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">
              <h2 className="title">Student Details</h2>
            </div>
            <div className="card-body">

            <div>
                <label>Select Field:</label>
                <select onChange={(e) => {setSelectedField(e.target.value);setSubj();}}>
                  {fields.map(field => (
                    <option key={field._id} value={field.counter}>{field.nm}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Select Subject:</label>
                <select onChange={(e) => {setSelectedSubject(e.target.value);setcou();}}>
                  <option value="">Select Course</option>
                  {subject.map(subject => (
                    <option key={subject._id} value={subject.counter}>{subject.nm}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Select Course:</label>
                <select onChange={(e) => setSelectedCourse(e.target.value)}>
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course.counter}>{course.nm}</option>
                  ))}
                </select>
              </div>
              
              <button onClick={fetchStudents}>Fetch Student Details</button>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Year of Graduation</th>
                    <th>Password</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Course ID</th>
                    <th>Field ID</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student._id}>
                      <td>{student.nm}</td>
                      <td>{student.yog}</td>
                      <td>{student.pass}</td>
                      <td>{student.dt}</td>
                      <td>{student.mail}</td>
                      <td>{student.con}</td>
                      <td>{student.ad}</td>
                      <td>{student.cid}</td>
                      <td>{student.fid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </section>
    </div>
  );
}

export default Company;
