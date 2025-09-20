import './Navbar.css';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/UserLogin');
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-title"> LiteraryLanes </div>
                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/Home" className="navbar-item">Home</Link>

                    <div
                        className="navbar-item dropdown"
                        onClick={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <span className="dropdown-title">
                            Categories <span className="dropdown-arrow">&#9662;</span>
                        </span>
                        <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                            <Link to="/fiction" className="dropdown-item">Fiction</Link>
                            <Link to="/non-fiction" className="dropdown-item">Non-Fiction</Link>
                            <Link to="/horror" className="dropdown-item">Horror</Link>
                            <Link to="/scifi" className="dropdown-item">Sci-Fi</Link>
                        </div>
                    </div>

                    <Link to="/about" className="navbar-item">About</Link>
                    <Link to="/contact" className="navbar-item">Contact Us</Link>

                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="navbar-item logout-btn">
                            <LogOut size={20} style={{ marginRight: '5px' }} />
                            Logout
                        </button>
                    ) : (
                        <Link to="/UserLogin" className="navbar-item login-btn">
                            <LogIn size={20} style={{ marginRight: '5px' }} />
                            Login
                        </Link>
                    )}
                </div>

                <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
