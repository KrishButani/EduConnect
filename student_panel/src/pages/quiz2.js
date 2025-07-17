import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import * as faceapi from 'face-api.js';
import { redirect } from 'react-router-dom';

function Quiz2({ testId }) {
  const videoRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timer, setTimer] = useState(100); // Set initial timer value

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => console.error('Error accessing camera:', error));
    };

    const detectFace = async () => {
      const video = videoRef.current;
      
      video.addEventListener('loadedmetadata', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);

        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

          // Draw rectangles around detected faces
          if (resizedDetections.length > 0) {
            setFaceDetected(true);
          } else {
            setFaceDetected(false);
          }

          resizedDetections.forEach((detection) => {
            const { x, y, width, height } = detection.detection.box;
            const box = new faceapi.draw.DrawBox({ x, y, width, height, label: 'Face' });
            box.draw(canvas);
          });
        }, 100);
      });
    };

    loadModels().then(() => {
      startVideo();
      detectFace();
    });
  }, []);

  const params = new URLSearchParams(window.location.search);
    testId = params.get('testid');

  useEffect(() => {
    
    console.log(testId);
    fetchQuestions(testId);
  }, []);// Fetch questions whenever testId changes

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
      if (timer === 0) {
        clearInterval(countdown);
        handleQuizEnd();
      }
    }, 600);

    // Clean up timer interval on component unmount
    return () => clearInterval(countdown);
  }, [timer]);

  const fetchQuestions = async (testId) => {
    try {
      const response = await axios.get(`http://localhost:4001/quiz?testid=${testId}`);
      setQuestions(response.data.map(question => ({
        ...question,
        options: shuffleArray([
          question.op1,
          question.op2,
          question.op3,
          question.trueoption
        ])
      })));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === questions[currentQuestionIndex].trueoption) {
      setScore(prevScore => prevScore + 5);
    }
    setSelectedOption("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of quiz
      setShowQuiz(false); // Hide quiz section

      try {
        const studentid = 1;
        
        // Update the axios.post URL
        const result = await axios.post("http://localhost:4001/test_student", {
          studentid,
          testId,
          score,
        });
        
        // alert(result.data); // Display the result from the server response
        
      } catch (error) {
        console.error("Error during registration:", error.message);
      }
      alert(`Quiz completed! Your score is ${score + (selectedOption === questions[currentQuestionIndex].trueoption ? 5 : 0)}`);
      // You can handle further actions here, like submitting the score to a server
      redirect('/dashboard')
    }
  };

  const handleQuizEnd = async () => {
    setShowQuiz(false);
    setTimerRunning(false);
    alert(`Quiz completed! Your score is ${score}`);
    
    // You can handle further actions here, like submitting the score to a server
  };
  return (
    <section className="bg-dark text-white" style={{ display: `${showQuiz ? "block" : "none"}` }}>
      <video ref={videoRef} autoPlay muted />
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div className="card p-4" style={{ background: "#3d3d3d", borderColor: "#646464" }}>
              <div className="d-flex justify-content-between gap-md-3">
                <h1 className="mb-2 fs-normal lh-base" style={{ color: "#fff" }}>
                  {questions[currentQuestionIndex]?.question}
                </h1>
                <div style={{ color: "#60d600", width: "100px", textAlign: "right" }}>
                  Time left: {timer}s
                </div>
                <h5 style={{ color: "#60d600", width: "100px", textAlign: "right" }}>
                  {currentQuestionIndex + 1} / {questions?.length}
                </h5>
              </div>
              <div>
                {questions[currentQuestionIndex]?.options?.map((item, index) => (
                  <button
                    key={index}
                    className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${
                      selectedOption === item && "bg-success"
                    }`}
                    onClick={() => handleOptionSelect(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {currentQuestionIndex + 1 !== questions.length ? (
                <button className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold" onClick={handleNextQuestion} disabled={!selectedOption}>
                  Next Question
                </button>
              ) : (
                <button className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold" onClick={handleNextQuestion} disabled={!selectedOption}>
                  Show Result
                </button>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quiz2;