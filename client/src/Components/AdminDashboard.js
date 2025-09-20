import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody
} from 'mdb-react-ui-kit';

export default function AdminDashboard() {
    let mybackendurl = "http://localhost:8000";
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/books');
            setBooks(response.data);
            setLoading(false);
        } catch (err) {
            setError('An error occurred while fetching books');
            setLoading(false);
            console.error('Error fetching books:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/books/${id}`);
            setBooks(books.filter((book) => book._id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
            setError("An error occurred while deleting the book");
        }
    };


    return (
        <MDBContainer>
            <h2 className="text-center my-4">Admin Dashboard</h2>
            <MDBCard>
                <MDBCardBody>
                    <div className="d-flex justify-content-between mb-3">
                        <h4>Book List</h4>
                        <Link to="/BooksCard">
                            <MDBBtn>Add New Book</MDBBtn>
                        </Link>
                        <Link to="/">
                            <MDBBtn>Logout</MDBBtn>
                        </Link>
                    </div>
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {books.map((book, index) => (
                                <tr key={book._id}>
                                    <td>{index + 1}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>Rs. {book.amount}</td>
                                    <td>
                                        <MDBBtn color="danger" size="sm" onClick={() => handleDelete(book._id)}>Delete</MDBBtn>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}
