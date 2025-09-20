import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';


function Admin() {

  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const correctPassword = "himani";  // Change this to your desired password

  const handleLogin = () => {
    if (password === correctPassword) {
      alert("Login Successful!"); // Optional success message
      navigate('/AdminDashboard')
      // navigate('/bookscard'); // Redirect to BookCard
    } else {
      alert("Incorrect Password! Please try again."); // Show error
    }
  };


  return (
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://t4.ftcdn.net/jpg/08/25/83/27/360_F_825832771_gyoChRNEc49MSyCn6fcfYstBBzzJ1Ttf.jpg)', height: '300px'}}></div>

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'rgb(34, 57%, 70%)', backdropFilter: 'blur(100px)'}}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">Literary Lanes <h4>Admin Login</h4></h2>

          <MDBInput wrapperClass='mb-4'  label='Password' placeholder='Enter Password' id='form1' type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <MDBBtn className='w-100 mb-4' size='md' onClick={handleLogin}>Login</MDBBtn>

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Admin;