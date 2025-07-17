// import { useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import mongoose from "mongoose";

import { useEffect, useRef, useState } from "react";

function Video2() {
  

  const videoRef = useRef(null);
  

  const [id, setid] = useState("");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [corid, setcorid] = useState([]);
  const [num, setNum] = useState("");
  const[file,setFile]=useState();
  const[progress,setProgress]=useState({started:false,pc:0});
  const[msg,setMsg]=useState(null);


  const upload=async (e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append('file',file)
    // formData.append('id',id)
    formData.append('title',title)
    formData.append('desc',desc)
    formData.append('corid',corid)
    formData.append('num',num)
    axios.post('http://localhost:8000/videoupload',formData,{
            onUploadProgress:(ProgressEvent)=>{setProgress(prevState=>{
                return {...prevState,pc:ProgressEvent.progress*100}
            })}
    })
    .then(res=>{
        setMsg("Upload Successful");
        console.log(res.data);
        alert("Sent")
    })
    .catch(er=>{
        alert("cant send")
        setMsg("Upload Fail");
        console.log(er)})
    setMsg("Uploading...");
    setProgress(prevState=>{
        return {...prevState,started:true}
    })
  
  // window.onload = async () => {
  //   await axios.get("mongodb://127.0.0.1:27017/Project").then((res) => {
  //     if (res.data === "fail") {
  //       alert("Failed");
  //     } else {
  //       // const info = getData(res.data);
  //     }
  //   });
  // }
  }
  

  return (
    <div className="App">
      <Sidebar />
      <section className="main_content dashboard_part large_header_bg">
        <Header />

        <div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">
              <h2 className="title">Add New Video </h2>
            </div>
            <div className="card-body">
              <form method="POST">
    <div className="form-row">
    <div className="name">Video Upload</div>
    <div className="value">
        <div className="row row-space">
            <div className="col-15">
                <div className="input-group-desc">
                    <input className="input--style-2" type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
            </div>
        </div>
    </div>
    {progress.started && <progress max="100" value={progress.pc}></progress>}
    {msg && <span>{msg}</span>}
</div>
                {/* <div className="form-row">
                  <div className="name">Video ID</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        onChange={(e) => {
                          setid(e.target.value);
                        }}
                        name="name"
                        id="name"
                      />
                    </div>
                  </div>
                </div> */}
                <div className="form-row">
                  <div className="name">Video Title</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        onChange={(e) => {
                          settitle(e.target.value);
                        }}
                        name="desc"
                        id="desc"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Description</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        onChange={(e) => {
                          setdesc(e.target.value);
                        }}
                        name="desc"
                        id="desc"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Course ID</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        onChange={(e) => {
                          setcorid(e.target.value);
                        }}
                        name="subid"
                        id="subid"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Video Number</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        onChange={(e) => {
                          setNum(e.target.value);
                        }}
                        name="name"
                        id="name"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  {/* <button
                    className="btn btn--radius-2 btn--red"
                    type="submit"
                    onClick={submit}
                    name="submit"
                    id="submit"
                  >
                    ADD
                  </button> */}
                  <button className="btn btn--radius-2 btn--red" type="upload" onClick={upload} >ADD</button>
                </div>
              </form>
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

export default Video2;

