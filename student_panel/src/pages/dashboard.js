import React, { useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../pages/css/animate.css';
import '../pages/css/style.css';
import '../pages/css/tiny-slider.css';
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
// import images from '../server/courseimage';
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faGoogle,
  faUser,
  faCalendarDays,
  faComments,
  faComment
} from "@fortawesome/free-brands-svg-icons";
const images = require("../server/courseimage/BG2.jpg");

const Dashboard = () => {
  
  const [data, getData] = useState([]);
  const [courses, setCourses] = useState([]);
  

  window.onload = async () => {
    await axios.get("http://localhost:4001/getCourse").then((res) => {
      if (res.data === "fail") {
        alert("Failed");
      } else {
        const info = getData(res.data);
      }
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4001/getCourse");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Add any initialization or side-effects code here
    // Note: For scripts in the original HTML, consider using useEffect for similar functionality
  }, []);

  return (
    <div>
      <div className="top-wrap">
        <div className="container">
         
        </div>
      </div>
      <nav className="navbar navbar-expand-lg  ftco-navbar-light">
        <div className="container-xl">
         
        </div>
      </nav>
      <section className="slider-hero">
<div className="overlay"></div>
<div className="hero-slider">
  <Carousel>
    <Carousel.Item>
      <div className="item">
        <div className="work">
          <div
            className="img img2 d-flex align-items-center js-fullheight"
            style={{ backgroundImage: "url(images/bg_1.jpg)" }}
          >
            <div className="container-xl">
              <div className="row d-flex justify-content-center">
                <div className="col-md-7">
                  <div className="text text-center mt-lg-5">
                    <h1 className="mb-4">
                      We're Always Here To Give Educational Help!
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Carousel.Item>
    <Carousel.Item>
      <div className="item">
        <div className="work">
          <div
            className="img d-flex align-items-center justify-content-center js-fullheight"
            style={{ backgroundImage: "url(images/bg_2.jpg)" }}
          >
            <div className="container-xl">
              <div className="row d-flex justify-content-center">
                <div className="col-md-7">
                  <div className="text text-center mt-lg-5">
                    <h1 className="mb-4">
                      Build Your Career Plan With Our Specialists
                    </h1>
            
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Carousel.Item>
  </Carousel>
</div>
</section>
      {/* <section className="ftco-section">
      <div className="container-xl">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-7 heading-section text-center" data-aos="fade-up" data-aos-duration="1000">
            <span className="subheading">Our Blog</span>
            <h2>Recent From Blog</h2>
          </div>
        </div>
        <div className="row justify-content-center">
        {courses.map(course => (
              <div key={course._id} className="col-md-6 col-lg-3 d-flex">
                <div className="blog-entry justify-content-end" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                  <a href="blog-single.html" className="block-20 img" style={{ backgroundImage: "url('images/image_3.jpg')" }}></a>
                  <div className="text">
                    <h3 className="heading mb-3">{course.nm}</h3>
                    <p>{course.desc}</p>
                    <Link to={`/course/${course.counter}`} className="btn-custom d-flex align-items-center justify-content-center">

                      <FontAwesomeIcon icon={faExternalLink} className="link-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
    <section className="ftco-intro-2 img" style={{ backgroundImage: "url(images/bg_3.jpg)" }}>
      <div className="overlay"></div>
      <div className="container-xl">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-10">
            <div className="row" data-aos="fade-up" data-aos-duration="1000">
              <div className="col-md-8 d-flex align-items-center">
                <div>
                  <span className="subheading">Prepare for takeoff</span>
                  <h1 className="mb-md-0 mb-4">Looking for business opportunity?</h1>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <p className="mb-0"><a href="#" className="btn btn-white py-md-4 py-3 px-md-5 px-4">Get Started</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
     <section className="ftco-section">
        <div className="container-xl">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 heading-section text-center" data-aos="fade-up" data-aos-duration="1000">
              
              <h2>Our Courses</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses.map(course => (
              <div key={course._id} className="col-md-6 col-lg-3 d-flex">
                <div className="blog-entry justify-content-end" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                <Link to={`/course/${course.counter}`} className="block-20 img" style={{ backgroundImage: `url(/13.jpg)` }}></Link>
                  <div className="text">
                    <h3 className="heading mb-3">{course.nm}</h3>
                    <p>{course.desc}</p>
                    <Link to={`/course/${course.counter}`} className="btn-custom d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon icon={faExternalLink} className="link-icon" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="ftco-intro-2 img" style={{ backgroundImage: images }}>
        <div className="overlay"></div>
        <div className="container-xl">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-10">
              <div className="row" data-aos="fade-up" data-aos-duration="1000">
                <div className="col-md-8 d-flex align-items-center">
                  <div>
                    <span className="subheading">Prepare for takeoff</span>
                    <h1 className="mb-md-0 mb-4">Looking for Solutions to Your Questions .. ??</h1>
                  </div>
                </div>
                <div className="col-md-4 d-flex align-items-center">
                  <p className="mb-0"><a href="https://mediafiles.botpress.cloud/69acb6c6-7e43-4432-93e0-3082162604d7/webchat/bot.html" className="btn btn-white py-md-4 py-3 px-md-5 px-4">Solve My Doubt</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script src="js/bootstrap.bundle.min.js"></script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-23581568-13');
        `}
      </script>
      <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v84a3a4012de94ce1a686ba8c167c359c1696973893317" integrity="sha512-euoFGowhlaLqXsPWQ48qSkBSCFs3DPRyiwVu3FjR96cMPx+Fr+gpWRhIafcHwqwCqWS42RZhIudOvEI+Ckf6MA==" data-cf-beacon='{"rayId":"854d2f5e6ca05a05","version":"2024.2.0","token":"cd0b4b3a733644fc843ef0b185f98241"}' crossorigin="anonymous"></script>
    </div>
  );
};

export default Dashboard;
