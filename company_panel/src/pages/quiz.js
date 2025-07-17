import React, { useState, useEffect } from "react";
import axios from 'axios'
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Quiz() {
  
  const[qname,setqname]=useState('')
  const [info, setInfo] = useState([]);
  const[question,setque]=useState('')
  const[top,settop]=useState('')
  const[op1,setop1]=useState('')
  const[op2,setop2]=useState('')
  const[op3,setop3]=useState('')
  const [selectedOptions, setSelectedOptions] = useState([]);
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/gettest");
        setInfo(response.data);
      } catch (error) {
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => ({
      value: option.value,
      name: option.getAttribute("name"),
    }));
    setSelectedOptions(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/quiz", {
        qname,question,top,op1,op2,op3,
        selectedOptions,
      });
      alert("Data sent successfully!");
    } catch (error) {
      alert("Failed to send data.");
    }
  };

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
                    <h2 className="title">Add New Quiz</h2>
                </div>
                <div className="card-body">
                    <form method="POST">
                        <div className="form-row m-b-55">
                           
                        </div>
                        <div className="form-row">
                            <div className="name">Quiz Name</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" onChange={(e)=>{setqname(e.target.value)}} name="name" id="name" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Questions</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" onChange={(e)=>{setque(e.target.value)}} name="name" id="name" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Option 1</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" onChange={(e)=>{setop1(e.target.value)}} name="name" id="name" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Option 2</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" onChange={(e)=>{setop2(e.target.value)}} name="name" id="name" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">Option 3</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" onChange={(e)=>{setop3(e.target.value)}} name="name" id="name" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="name">True Option</div>
                            <div className="value">
                                <div className="input-group">
                                    <input className="input--style-5" type="text" onChange={(e)=>{settop(e.target.value)}} name="name" id="name" />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                  <div className="name">Select test</div>
                  <div className="value">
                    <div className="input-group">
                      <select
                        name="tid"
                        onChange={handleSelectChange}
                        multiple
                        required // Ensure at least one option is selected
                      >
                        {info.map((info) => (
                          <option
                            key={info.counter}
                            value={info.counter}
                            name={info.test_title}
                          >
                            {info.test_title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                        <div>
                            <button className="btn btn--radius-2 btn--red" type="submit" onClick={handleSubmit} name="submit" id="submit">ADD</button>
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
  
  export default Quiz;