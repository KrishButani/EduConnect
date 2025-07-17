import React, { useEffect, useState } from 'react';
import './CourseEnrollmentPage.css';
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';


import axios from 'axios';

import { CookiesProvider, useCookies } from 'react-cookie';

const CourseEnrollmentPage = () => {
    const params = useParams();
    const counter = params.id;
    const navigate = useNavigate();
    const [data, getData] = useState([]);
    const [data2, getData2] = useState([]);  //video list
    const [data3, getData3] = useState([]);     //quiz list
    const [cookies, setCookie] = useCookies(['user'])
    const stdid = cookies.user
    console.log(counter)
    const handleEnrollClick = () => {
        // Add your enrollment logic here
        axios.post("http://localhost:4001/addstu_course", {
            counter,stdid
        })
        .then((res) => {
        getData(res.data);
        console.log(stdid);
      });
        console.log('Enrollment button clicked!');
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        console.log(e)
        try {
          await axios.post("http://localhost:4001/setquiz", {
            e,
          });
          alert("Are You Sure ?  (If Yes than Click Ok)");
        
          navigate(`/quiz?testid=${e}`);
        } catch (error) {
          console.error("Error sending quiz:", error);
          alert("Issue !!!");
        }
      };

    useEffect(() => {
        axios.post("http://localhost:4001/getMyCourse", {
            counter
        })
        .then((res) => {
        getData(res.data);
        
    });

    axios.post("http://localhost:4001/getMyVideo", {
            counter
        })
        .then((res) => {
        getData2(res.data);
        
    });

    axios.post("http://localhost:4001/getMyQuiz", {
            counter
        })
        .then((res) => {
        getData3(res.data);
        
    });

    }, []);



    return (
        <div>
            
            {/* New Header Section */}
            <header className="header">
                <div className="container">
                    <div className="logo">
                        {/* <a href="/">YourLogo</a> */}
                    </div>
                    <nav className="navbar">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Courses</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header> 
            
            <div className="sidebar">
                <ul className="list-group">
                {data2.map(data2 => (
                    <li className="list-group-item" >{data2.title}</li>
                    ))}
                    {data3.map(data3 => (
                    <li className="list-group-item"><button onClick={() => handleSubmit(data3.counter)}>{data3.test_title}</button></li>
                    ))}


                </ul>

            </div>
            
            {/* Main Content */}
            <div className="main-content">
                {/* Image Slider Section */}
                        <div className="slide"><img src={`/13.jpg`} alt="Slide 1"/></div>

                {/* Content Section */}
                <div className="content">
                    <h2>{data.title}</h2>
                    <p>{data.desc}
                    </p>
                </div>

                {/* Enroll Button */}
                <div className="enroll-button-container">
                    <button className="enroll-button" onClick={handleEnrollClick}>
                        <Link className="enroll-button" to="/Vidplay"> Enroll in Course</Link>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CourseEnrollmentPage;
