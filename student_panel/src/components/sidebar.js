import React from 'react';
import {Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <nav className="sidebar vertical-scroll ps-container ps-theme-default ps-active-y">
            <div className="logo d-flex justify-content-between">
                <a href="index.html"><img src="img/logo.png" alt="" /></a>
                <div className="sidebar_close_icon d-lg-none">
                    <i className="ti-close"></i>
                </div>
            </div>
            <ul id="sidebar_menu">
                <li className="mm-active">
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="icon_menu">
                            <img src="img/menu-icon/dashboard.svg" alt="" />
                        </div>
                        <span>Manage Student</span>
                    </a>
                    <ul>
                        <li><Link className="active" to="/student2"> Add Student </Link></li>
                        
                    </ul>
                </li>
                <li className="">
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="icon_menu">
                            <img src="img/menu-icon/2.svg" alt="" />
                        </div>
                        <span>Manage Tutor</span>
                    </a>
                    <ul>
                    <li><Link className="active" to="/tutor"> Add Tutor </Link></li>
                    </ul>
                </li>
                <li className="">
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="icon_menu">
                            <img src="img/menu-icon/3.svg" alt="" />
                        </div>
                        <span>Manage Field</span>
                    </a>
                    <ul>
                    <li><Link className="active" to="/field2"> Add Field </Link></li>

                    </ul>
                </li>
                <li className="">
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="icon_menu">
                            <img src="img/menu-icon/4.svg" alt="" />
                        </div>
                        <span>Manage College</span>
                    </a>
                    <ul>
                    <li><Link className="active" to="/college2"> Add College </Link></li>
                    </ul>
                </li>
                <li className="">
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="icon_menu">
                            <img src="img/menu-icon/5.svg" alt="" />
                        </div>
                        <span>Manage Subject</span>
                    </a>
                    <ul>
                    <li><Link className="active" to="/subject2"> Add Subject </Link></li>

                    </ul>
                </li>
                <li className="">
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="icon_menu">
                            <img src="img/menu-icon/2.svg" alt="" />
                        </div>
                        <span>Manage Course</span>
                    </a>
                    <ul>
                    <li><Link className="active" to="/course2"> Add Course </Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
