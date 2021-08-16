import React from 'react';
import './book-list-item.css';

const BookListItem = ({ book, onAddedToCart }) => {
    const { title, author, price, genre, coverImage } = book;
    return (
        <div className="container">
            <div className="card mb-3">
                <div className="card-wrap">
                    <div className="image-cover">
                        <img src={coverImage} alt="Book cover"></img>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                        <h6 className="card-subtitle text-muted">{author}</h6>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{genre}</li>
                        </ul>
                        <div className="card-body">
                            <button 
                            type="button" 
                            className="addButton btn btn-info disabled"
                            onClick={onAddedToCart}>add to cart</button>
                        </div>
                    </div>
                    
                </div>
                
                <h4 className="card-header">{price}$</h4>
                
            </div>
        </div>    
    )
}

export default BookListItem;