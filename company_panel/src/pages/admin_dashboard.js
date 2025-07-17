import React from "react"; // Import React
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function admin_dashboard() {
  return (
    <div className="App">
      <Sidebar />
      <section className="main_content dashboard_part large_header_bg">
        <Header />
        <Footer />
      </section>
    </div>
  );
}

export default admin_dashboard;
