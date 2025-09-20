import './home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BuyBook from './BuyBook';

export default function Home() {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* <h1>Books</h1> */}
      <img className="offer" src='https://img.freepik.com/free-photo/modern-bookstore-showcasing-rows-vibrant-books_60438-3565.jpg' alt='offer'  />

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
              {/* <p>Category: {book.category}</p> */}
              <p>{book.description}</p>
              <p style={{fontWeight:"bold"}} >Only in Rs.{book.amount}</p>
              <BuyBook book={book} />
              {/* <button>Buy</button> */}
            </div>


          </div>
        ))}
      </div>
      {/* </div> */}
    </div>

  );
}