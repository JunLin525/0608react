import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//import { ReactComponent as Arrowleft } from '../assets/arrow-left.svg'
//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { ReactComponent as Arrowleft } from '../assets/arrow-left.svg'


const BookDetailPage = () => {
    const { BooksID } = useParams()
    const navigate = useNavigate()
    const [Books, setBooks] = useState(null)
  
    useEffect(() =>{
        let getBooks = async ()=>{
            let response = await fetch(`http://localhost:8000/books/detail/${BooksID}`)
            let buku = await response.json()
            setBooks(buku)
        }
    
        getBooks()
        }, [BooksID])

        //新增
        let creatBooks = async()=>{
            const BookData ={
                book_name:Books.book_name,
                author:Books.author,
                publishing_house: Books.publishing_house,
                ISBN: Books.ISBN,
                Abstract: Books.Abstract,
            }
            
            fetch(`http://170.187.229.248:8000/books/`,{
            method:"POST",
            'headers':{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(BookData)
        })
        }

        //刪除
        let deleteBooks = async()=>{
            fetch(`http://170.187.229.248:8000/books/detail/${BooksID}`,{
                method:"DELETE",
                'headers' :{
                    'Content-Type': 'application/json'
            }
        })
        navigate('/')
        }   

        //更新

        let UpdateBooks = async () => {
            try {
                await fetch(`http://170.187.229.248:8000/books/detail/${BooksID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Books)
                })
            } catch (error) {
            console.error('Error updating Books:', error);
            }
        }

        let handleSubmit =async() =>{
            if(BooksID !== 'new' && Books.Abstract === ''){
                await deleteBooks()
            }   else if (BooksID !== 'new'){
                await UpdateBooks()
            }   else if (BooksID === 'new' && Books.Abstract !== null){
                await creatBooks()
            }
            navigate('/')
        }


        let handleChange = (value) => {
            setBooks(prevBooks =>({...prevBooks, 'body': value}))
        }

  return (
    <div className="Books">
      <div className="Books-header">

      <textarea onChange={(e) => { handleChange(e.target.value) }} value={Books?.Abstract}></textarea>
        <br></br>
        <h3>
            <Arrowleft onClick={handleSubmit}/>
        </h3>
        {BooksID !== 'new'? (
            <button onClick ={deleteBooks}>Delete</button>
        ): (
            <button onClick ={handleSubmit}>Done</button>
        )}
        <button>
            <Link to="/">back to home</Link>
        </button>

        </div>

        
        

        </div>
      ) 
}



export default BookDetailPage;
