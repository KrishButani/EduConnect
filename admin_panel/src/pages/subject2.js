import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Subject2() {
  const [nm, setNm] = useState("");
  const [info, setInfo] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getField");
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
      await axios.post("http://localhost:8000/subject", {
        nm,
        selectedOptions,
      });
      alert("Data sent successfully!");
    } catch (error) {
      alert("Failed to send data.");
    }
  };

  return (
    <div className="App">
      <Sidebar />
      <section className="main_content dashboard_part large_header_bg">
        <Header />

        <div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">
              <h2 className="title">Add New Subject</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row m-b-55"></div>
                <div className="form-row">
                  <div className="name">Subject Name</div>
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
                        required // Ensure subject name is required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Select Field</div>
                  <div className="value">
                    <div className="input-group">
                      <select
                        name="fieldid"
                        onChange={handleSelectChange}
                        multiple
                        required // Ensure at least one option is selected
                      >
                        {info.map((info) => (
                          <option
                            key={info.counter}
                            value={info.counter}
                            name={info.nm}
                          >
                            {info.nm}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn--radius-2 btn--red"
                    type="submit"
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

export default Subject2;
