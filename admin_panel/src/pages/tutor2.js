import React,{useState} from 'react'
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios'
function Tutor2() {

    const[file,setFile]=useState()
    const[progress,setProgress]=useState({started:false,pc:0});
    const[msg,setMsg]=useState(null);
    const[nm,setNm]=useState('')
    

    // let submit=async(e)=>{
    //   e.preventDefault()
    //   try{
          
    //       await axios.post("http://localhost:4001/tutor",{
    //        nm
    //       })
    //       alert("Sent")
    //   }
    //   catch{
    //     alert("cant send")
    //   }
    // }

    const upload=async (e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append('file',file)
        formData.append('nm',nm)
        axios.post('http://localhost:8000/tutorimage',formData,{
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



      
      
}
    return (
      <div className="App">
        <Sidebar />
        <section className="main_content dashboard_part large_header_bg">
          <Header />      
      
      <div className="wrapper wrapper--w790">
            <div className="card card-5">
                <div className="card-heading">
                    <h2 className="title">Add New Tutor</h2>
                </div>
                <div className="card-body">
                    <form method="POST">
    <div className="form-row">
    <div className="name">Tutor Upload</div>
    <div className="value">
        <div className="row row-space">
            <div className="col-15">
                <div className="input-group-desc">
                    <input accept=".jpg" className="input--style-2" type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
            </div>
        </div>
    </div>
    {progress.started && <progress max="100" value={progress.pc}></progress>}
    {msg && <span>{msg}</span>}
</div>
{/* <button className="btn btn--radius-2 btn--red" onClick={upload}>Upload</button> */}
<div>

                        
                        </div>

                        <div className="form-row">
                            <div className="name">Tutor Name</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" onChange={(e)=>{setNm(e.target.value)}} name="name" id="name" />
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* <button className="btn btn--radius-2 btn--red" type="upload" onClick={upload} name="upload" id="upload">ADD</button> */}
                            <button className="btn btn--radius-2 btn--red" type="upload" onClick={upload} >ADD</button>
                        </div>
                    </form>
                </div>  
            </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <Footer />
        </section>
      </div>
    );
  }

  export default Tutor2;


