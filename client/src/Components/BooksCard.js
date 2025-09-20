import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTextArea,
  MDBCol,
  MDBRow,
  MDBInput
}
  from 'mdb-react-ui-kit';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


export default function BooksCard() {
  let mybackendurl = "http://localhost:8000"

  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [author, setAuthor] = useState("")
  const [quantity, setQuantity] = useState("")
  const [amt, setAmt] = useState("")

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('uploaded_file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('author', author);
      formData.append('quantity', quantity);
      formData.append('amt', amt);

      console.log('Sending file:', file);

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // console.log('Form data:', formData);

      const res = await axios.post(mybackendurl + "/enterBook", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // console.log(res.data);
      console.log('Response:', res.data);
      if (res.data) {
        alert("Entered Successfully")
        setFile(null)
        setTitle("")
        setDescription("")
        setCategory("")
        setAuthor("")
        setQuantity("")
        setAmt("")
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error registering. Please try again.");
    }
  }


  return (
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://img.freepik.com/premium-photo/coffee-cup-books-glasses-contemporary-background_1252980-49646.jpg?ga=GA1.1.1920329494.1737012930&semt=ais_hybrid)', height: '300px', width: '100%' }}></div>
      {/* <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px' }}></div> */}

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">Enter Book Details</h2>
          <form onSubmit={handleBook}>
            <FormControl  >

              <MDBInput wrapperClass='mb-4' type='file' name='"uploaded_file' onChange={handleFile} />

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4'
                    label='Enter Book Title'
                    type='text'
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} />
                </MDBCol>

                <MDBCol col='6'>
                  <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Category</InputLabel>
                    <Select
                      labelId="simple-select-label"
                      id="simple-select"
                      value={category}
                      label="category"
                      onChange={handleCategory}
                      sx={{ height: '35px' }}
                    >
                      <MenuItem value="fiction">Fiction</MenuItem>
                      <MenuItem value='non-fiction'>Non-Fiction</MenuItem>
                      <MenuItem value='horror'>Horror</MenuItem>
                      <MenuItem value='sci-fi'>Sci-Fi</MenuItem>
                    </Select>
                  </FormControl>
                </MDBCol>
              </MDBRow>

              <MDBTextArea wrapperClass='mb-4'
                label="Enter Book Description"
                rows={'4'}
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginBottom: '20px' }} />

              <MDBInput wrapperClass='mb-4'
                label='Author Name'
                type='text'
                value={author} onChange={(e) => setAuthor(e.target.value)} />

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4'
                    label='Enter Quantity Available'
                    type='number'
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4'
                    label='Book Price'
                    type='number'
                    value={amt} 
                    onChange={(e) => setAmt(e.target.value)} />
                </MDBCol>
              </MDBRow>

              <MDBBtn className='w-100 mb-4' size='md' type='submit' >Enter</MDBBtn>

            </FormControl>
          </form>

              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}> <Link to="/AdminDashboard" style={{ color: '#393f81' }}>Back</Link></p>


        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}
