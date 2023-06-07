import {
    BrowserRouter as Router,
    Routes, Route
   } from "react-router-dom";
import React from "react";
import BookListPage from "./books/BookListPage";
import BookDetailPage from "./books/BookDetailPage";


function App(){

    return (
        <>
        <Router>
        <div className ='container dark'>
          <div className="app">
        
            <Routes>
              <Route path="/" element={<BookListPage />} />
              <Route path="/Books/:BooksID" element ={<BookDetailPage />}/>
            </Routes>
          </div>
        </div>
      </Router>
        </>
    )    
}

export default App;