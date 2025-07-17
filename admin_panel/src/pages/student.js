import React,{useState} from 'react'
import axios from 'axios'

export default function Course() {

    const[nm,setNm]=useState('')
    const[yog,setyog]=useState('')
    const[pass,setPwd]=useState('')
    const[dt,setdd]=useState('')
    const[mail,setmail]=useState('')
    const[con,setcon]=useState('')
    const[ad,setad]=useState('')

    let submit=async(e)=>{
      e.preventDefault()
      try{
          
          await axios.post("http://localhost:8000/student",{
           nm,yog,pass,dt,mail,con,ad
          })
          alert("Sent")
      }
      catch{}
    }

{
      
      
};

  return (
    <div className="main">
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <form method="POST" id="signup-form" className="signup-form">
            <h2 className="form-title">Create  New  Course</h2>
            <div className="form-group">
              <input
                type="text" onChange={(e)=>{setNm(e.target.value)}}
                className="form-input"
                name="name"
                id="name"
                placeholder="Student Name"
              />
            </div>
            <div className="form-group">
              <input
                type="date" 
                className="form-input" onChange={(e)=>{setdd(e.target.value)}}
                name="date"
                id="date"
                placeholder="Date"
              />
            </div>
            <div className="form-group">
              <input
                type="Number" 
                className="form-input" onChange={(e)=>{setyog(e.target.value)}}
                name="desc"
                id="desc"
                placeholder="Year of Graduation"
              />
            </div>

            <div className="form-group">
              <input
                type="mail" 
                className="form-input" onChange={(e)=>{setmail(e.target.value)}}
                name="desc"
                id="desc"
                placeholder="E-Mail"
              />
            </div>
            <div className="form-group">
              <input
                type="Password" onChange={(e)=>{setPwd(e.target.value)}}
                className="form-input"
                name="subid"
                id="subid"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                type="Number" onChange={(e)=>{setcon(e.target.value)}}
                className="form-input"
                name="subid"
                id="subid"
                placeholder="Contact No."
              />
            </div>
            <div className="form-group">
              <input
                type="textarea" onChange={(e)=>{setad(e.target.value)}}
                className="form-input"
                name="subid"
                id="subid"
                placeholder="Address"
              />
            </div>
            <div class="form-group">
              <input
                type="submit" 
                name="submit"onClick={submit}
                id="submit"
                class="form-submit"
                value="Send"
              />
            </div>
          </form>
          {
        
      }
          
        </div>
      </div>
    </section>
  </div>
  )
}
