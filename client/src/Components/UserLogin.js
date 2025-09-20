import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  // MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';

export default function UserLogin({ setIsLoggedIn }) {
  let mybackendurl = "http://localhost:8000"
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(mybackendurl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // Login successful
      alert('Login successful');
      // console.log('User ID:', result.userId);
      if (result.token) {
        localStorage.setItem('token', result.token)
        setIsLoggedIn(true);
        setEmail('');
        setPassword('');
        // Redirect to home page 
        navigate('/home');
      }
      else {
        throw new Error('Token not received from server');
      }



    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'Failed to fetch') {
        alert('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        alert(error.message || 'An error occurred during login. Please try again.');
      }
    }
  };


  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://img.freepik.com/premium-vector/online-book-store-concept-woman-buy-digital-books-smartphone-isolated-vector-isometric-illustration-isolated-vector-illustration_277904-7080.jpg?semt=ais_hybrid' alt="login form" className='rounded-start w-100' />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <h4 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h4>

              <MDBInput wrapperClass='mb-4'
                label='Email address'
                id='formControlLg'
                type='email'
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />


              <MDBInput wrapperClass='mb-4'
                label='Password'
                id='formControlLg'
                type='password'
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                />

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleLogin}>Login</MDBBtn>
              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/UserRegister" style={{ color: '#393f81' }}>Register here</Link></p>
              {/* <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <Link to="/Frontpage" style={{ color: '#393f81' }}>pagee</Link></p> */}

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}