import React,{useState} from 'react'
import axios from 'axios'
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Field2() {
    const[nm,setNm]=useState('')
    

    let submit=async(e)=>{
      e.preventDefault()
      try{
          
          await axios.post("http://localhost:8000/field",{
           nm
          })
          alert("Sent")
      }
      catch{
        alert("cant send")
      }
    }

{
      
      
};
    return (
        <div className="App">
        <Sidebar />
        <section className="main_content dashboard_part large_header_bg">
          <Header />      
          
      
      <div className="wrapper wrapper--w790">
            <div className="card card-5">
                <div className="card-heading">
                    <h2 className="title">Add New Field</h2>
                </div>
                <div className="card-body">
                    <form method="POST">
                        <div className="form-row m-b-55">
                           
                        </div>
                        <div className="form-row">
                            <div className="name">Field Name</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" onChange={(e)=>{setNm(e.target.value)}} name="name" id="name" />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <button className="btn btn--radius-2 btn--red" type="submit" onClick={submit} name="submit" id="submit">ADD</button>
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
  
  export default Field2;