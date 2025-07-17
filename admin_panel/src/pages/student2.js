import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Student2() {
  const [nm, setNm] = useState("");
  const [yog, setyog] = useState("");
  const [pass, setPwd] = useState("");
  const [dt, setdd] = useState("");
  const [mail, setmail] = useState("");
  const [con, setcon] = useState("");
  const [ad, setad] = useState("");
  const [data, getData] = useState([]);
  const [data2, getData2] = useState([]);
  const [cid, setcid] = useState("");
  const [fid, setfid] = useState("");

  let submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/student", {
        nm,
        yog,
        pass,
        dt,
        mail,
        con,
        ad,
        cid,
        fid,
      });
      alert("Sent");
    } catch {}
  };
  window.onload = async () => {
    await axios.get("http://localhost:8000/getCollege").then((res) => {
      if (res.data === "fail") {
        alert("Failed");
      } else {
        const info = getData(res.data);
      }
    });
    await axios.get("http://localhost:8000/getField").then((res) => {
        if (res.data === "fail") {
          alert("Failed");
        } else {
           const fdet = getData2(res.data);
        }
      });
  };
  

  
  return (
    <div className="App">
      <Sidebar />
      <section className="main_content dashboard_part large_header_bg">
        <Header />

        <div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">
              <h2 className="title">Add New Student </h2>
            </div>
            <div className="card-body">
              <form method="POST">
                <div className="form-row m-b-55"></div>
                <div className="form-row">
                  <div className="name">Student Name</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        onChange={(e) => {
                          setNm(e.target.value);
                        }}
                        name="name"
                        id="name"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Date of Birth</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="date"
                        onChange={(e) => {
                          setdd(e.target.value);
                        }}
                        name="date"
                        id="date"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Year of Graduation</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="Number"
                        onChange={(e) => {
                          setyog(e.target.value);
                        }}
                        name="yog"
                        id="yog"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">E-Mail</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="mail"
                        onChange={(e) => {
                          setmail(e.target.value);
                        }}
                        name="yog"
                        id="yog"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Password</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="password"
                        onChange={(e) => {
                          setPwd(e.target.value);
                        }}
                        name="yog"
                        id="yog"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Contact No.</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="Number"
                        onChange={(e) => {
                          setcon(e.target.value);
                        }}
                        name="con"
                        id="con"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Address</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        onChange={(e) => {
                          setad(e.target.value);
                        }}
                        name="con"
                        id="con"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Select College</div>
                  <div className="value">
                    <div className="input-group">
                      <select
                        name="collegeid"
                        onChange={(e) => {
                          setcid(e.target.value);
                        }}
                      >
                        {data.map((info) => (
                          <option value={info.counter}> {info.nm}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Select Field</div>
                  <div className="value">
                    <div className="input-group">
                      <select
                        name="fieldid"
                        onChange={(e) => {
                          setfid(e.target.value);
                        }}
                      >
                        {data2.map((fdet) => (
                          <option value={fdet.counter}> {fdet.nm}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn--radius-2 btn--red"
                    type="submit"
                    onClick={submit}
                    name="submit"
                    id="submit"
                  >
                    ADD
                  </button>
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

export default Student2;
