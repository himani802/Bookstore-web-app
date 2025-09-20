import './home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Horror() {
    const [books, setBooks] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        fetchBooks();
      }, []);
    
      const fetchBooks = async () => {
        try {
          const response = await axios.get('http://localhost:8000/books');
          const horrorBooks = response.data.filter(book => book.category.toLowerCase() === 'horror');
          setBooks(horrorBooks);
          setLoading(false);
        } catch (err) {
          setError('An error occurred while fetching books');
          setLoading(false);
          console.error('Error fetching books:', err);
        }
      };
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>{error}</div>;
    
    return (
        <div>
      <h1 style={{ textAlign: 'center', color: 'black' }}>Horror Books</h1>

      {/* <div className="container"> */}
      <div className="card">

        {books.map((book) => (
          <div key={book._id} className="cardbody">

            <div className="frontside">
              {book.image && (
                <img className="image"
                  src={`http://localhost:8000${book.image}`}
                  alt={book.title}
                // style={{ maxWidth: '200px' }}
                />
              )}
            </div>

            <div className="backside">

              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <p>Amount: ${book.amount}</p>
              <button>Buy</button>
            </div>


          </div>
        ))}
      </div>
      {/* </div> */}
    </div>

    );
}