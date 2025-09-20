import './UserRegister.css';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    // MDBIcon
}
    from 'mdb-react-ui-kit';

export default function UserRegister() {
    let mybackendurl = "http://localhost:8000"

    const [email, setEmail] = useState("")
    const [pwd1, setPwd1] = useState("")
    const [pwd2, setPwd2] = useState("")

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleRegister = async () => {
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address");
            return;
        }
        try {
            const res = await fetch(mybackendurl + "/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: pwd1,
                    password2: pwd2
                })
            })

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || `HTTP error! status: ${res.status}`);
            }

            console.log(result);
            if (result) {
                // alert("Register Successfull")
                alert(result.message)
                setEmail("")
                setPwd1("")
                setPwd2("")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert(error.message || "Error registering. Please try again.");
        }
    }

    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

            <MDBRow>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                        Literary Lanes <br />
                        <span style={{ color: 'hsl(218, 81%, 75%)' }}><h3>Largest Online BookStore</h3></span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>

                        Explore a curated collection of novels, biographies, classics, and contemporary works from authors across the globe. From the cozy comfort of fiction to the stimulating depths of non-fiction, we cater to readers of all tastes and ages.
                        <br />

                        {/* Our mission is to ignite your imagination, inspire your curiosity, and connect you to the transformative power of books. Dive into Literary Lanes and find your next unforgettable read! */}
                        <br />

                        Step into a world of words, expand your horizons, and let your next adventure start with us. Your perfect book is just a click away!

                    </p>

                </MDBCol>

                <MDBCol md='6' className='position-relative'>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <MDBCard className='my-5 bg-glass'>
                        <MDBCardBody className='p-5' >

                            <h2 className="fw-bold mb-5 text-center">SignUp Now </h2>

                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4'
                                        label='First name'
                                        id='form1'
                                        type='text' />
                                </MDBCol>

                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4'
                                        label='Last name'
                                        id='form1'
                                        type='text' />
                                </MDBCol>
                            </MDBRow>


                            <MDBInput wrapperClass='mb-4'
                                label='Email'
                                id='form3'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />


                            <MDBInput wrapperClass='mb-4'
                                label='Password'
                                id='form4'
                                type='password'
                                value={pwd1}
                                onChange={(e) => setPwd1(e.target.value)} />


                            <MDBInput wrapperClass='mb-4'
                                label='Repeat Password'
                                id='form5'
                                type='password'
                                value={pwd2}
                                onChange={(e) => setPwd2(e.target.value)} />


                            <MDBBtn className='w-100 mb-4'
                                onClick={handleRegister}
                                color='dark'
                                size='md'>SignUp</MDBBtn>

                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already a User!! <Link to="/UserLogin" style={{ color: '#393f81' }}>Login</Link></p>


                            
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}
