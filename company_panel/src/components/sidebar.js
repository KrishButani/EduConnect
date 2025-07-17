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
                        <span>Browse Student</span>
                    </a>
                    <ul>
                        <li><Link className="active" to="/company"> view Student </Link></li>
                        
                    </ul>
                </li>
                <li className="">
                    <a className="has-arrow" href="#" aria-expanded="false">
                        <div className="icon_menu">
                            <img src="img/menu-icon/2.svg" alt="" />
                        </div>
                        <span>Block Student</span>
                    </a>
                    <ul>
                    <li><Link className="active" to="/company"> Block Student </Link></li>
                    </ul>
                </li>
                               
            </ul>
        </nav>
    );
};

export default Sidebar;
