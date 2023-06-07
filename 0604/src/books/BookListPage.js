import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddButton from '../components/AddButton';

const BookListPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);


  const getBooks = async () => {
    try {
      const response = await fetch('http://170.187.229.248:8000/books/');
      const buku = await response.json();
      setBooks(buku);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }//如果沒有收到就報錯
  };

  const navigate = useNavigate();



  return (
    <div className="Books">
      <div className="Books-header">
        <p className="Books-count"> Total is {books.length} Articles</p>
      </div>
      <div className="books-list">
      <h1>Books</h1>
      <ul>
        {books.map((b) => (
          <>    
          <button key={b.pk} onClick={() => navigate(`/books/detail/${b.pk}`)}>{b.pk} {b.book_name}</button>       
          <li key={b.pk}>{b.book_name}</li>
          {/*<li key={article.pk}>{article.author}</li>*/}
          <li key={b.pk}>{new Date(b.date).toLocaleString()}</li>
          <hr/>
          <br/>
          </>
        ))}
      </ul>
      <AddButton/>
    </div>
    </div>
  )
}

export default BookListPage;
