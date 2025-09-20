import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Home from './Components/Home';
import Navbar from "./Navbar";
import Fiction from './Components/Fiction';
import NonFiction from "./Components/NonFiction";
import SciFi from "./Components/SciFi";
import Horror from "./Components/Horror";
import UserLogin from './Components/UserLogin';
import UserRegister from './Components/UserRegister';
import Admin from "./Components/Admin";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import BooksCard from "./Components/BooksCard";
import Frontpage from "./Components/Frontpage";

import AdminDashboard from "./Components/AdminDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Frontpage appears first */}
        <Route path="/" element={<Frontpage />} />

        {/* Login route */}
        <Route path="/UserLogin" element={isLoggedIn ? <Navigate to="/home" /> : <UserLogin setIsLoggedIn={setIsLoggedIn} />} />

        {/* Register route */}
        <Route path="/UserRegister" element={<UserRegister />} />

        {/* Admin Route (Fix: Moved outside the protected routes) */}
        <Route path="/admin" element={<Admin />} />

        {/* BooksCard should be accessible even if not logged in */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/bookscard" element={<BooksCard />} />

        {/* Protected routes inside Navbar */}
        {isLoggedIn && (
          <Route path="/" element={<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
            <Route path="home" element={<Home />} />
            <Route path="fiction" element={<Fiction />} />
            <Route path="non-fiction" element={<NonFiction />} />
            <Route path="horror" element={<Horror />} />
            <Route path="SciFi" element={<SciFi />} />
            {/* <Route path="bookscard" element={<BooksCard />} /> */}
            <Route path="cancel" element={<Cancel />} />
            <Route path="success" element={<Success />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
