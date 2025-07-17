import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import img from './myimg.jpg';
// import { fetchImage, computeFaceDescriptors, LabeledFaceDescriptors, FaceMatcher } from 'face-api.js';


function Quiz() {
  const videoRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(true);
  const [timer, setTimer] = useState(100); // Set initial timer value

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
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
      
      video.addEventListener('loadedmetadata', async () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
    
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);
    
        // Fetch the reference image
        const referenceImage = await fetchReferenceImage();
    
        if (!referenceImage) {
          // Error fetching reference image, terminate quiz
          handleQuizEnd("Error fetching reference image");
          return;
        }
    
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();
    
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    
          if (resizedDetections.length === 0) {
            // No face detected
            handleQuizEnd("No face detected");
          } else {
            // Check if the detected face matches the reference image
            const faceMatcher = new faceapi.FaceMatcher([referenceImage], 0.5); // Adjust threshold here (0.5 for example)
      const bestMatch = faceMatcher.findBestMatch(resizedDetections[0].descriptor);

    
            if (bestMatch._label !== 'unknown') {
              // Face detected, but it's not the reference image
              handleQuizEnd("Face detected, but not the reference image");
            }
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testId = params.get('testid');
    if (testId) {
      fetchQuestions(testId);
    }
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
      if (timer === 0) {
        clearInterval(countdown);
        handleQuizEnd("Time's up");
      }
    }, 1000);

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

  const fetchReferenceImage = async () => {
    try {
      const referenceImage = await fetch(img); // Relative path to the reference image
      const blob = await referenceImage.blob();
      const imgEl = document.createElement('img');
      imgEl.src = URL.createObjectURL(blob);
      document.body.append(imgEl);
  
      const detection = await faceapi.detectSingleFace(imgEl).withFaceLandmarks().withFaceDescriptor();
      if (!detection) {
        console.error("No face detected in the reference image.");
        return null;
      }
  
      const faceDescriptor = detection.descriptor;
      return new faceapi.LabeledFaceDescriptors('face', [faceDescriptor]);
    } catch (error) {
      console.error("Error fetching reference image:", error);
      return null;
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

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].trueoption) {
      setScore(prevScore => prevScore + 5);
    }
    setSelectedOption("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowQuiz(false);
      alert(`Quiz completed! Your score is ${score}`);
      // Redirect to dashboard or any other action
    }
  };

  const handleQuizEnd = (reason) => {
    setShowQuiz(false);
    alert(`Quiz terminated: ${reason}`);
    // Redirect to dashboard or any other action
  };

  return (
    <>
    {/* <img src={img} className="App-logo" alt="logo" /> */}
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
              <button className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold" onClick={handleNextQuestion} disabled={!selectedOption}>
                {currentQuestionIndex + 1 !== questions.length ? "Next Question" : "Show Result"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Quiz;
