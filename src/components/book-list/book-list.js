import React, { Component } from 'react';
import { connect } from 'react-redux';

import './book-list.css';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError, fetchBooks, bookAddedToCart } from '../../actions';
import { filterBy } from '../../utils'; 


const BookList = ({books, onAddedToCart}) => {
    return (
        <div className="list-group">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem 
                            book={book}
                            onAddedToCart={() => onAddedToCart(book.id)} 
                            />
                        </li>
                    ) 
                })
            }
        </div>
    );    
}

class BookListContainer extends Component {

    componentDidMount () {
        this.props.fetchBooks();
    }

    render () {
        const { books, loading, error, label, genre, onAddedToCart } = this.props;

        if (loading) {
            return (
                <div className="list-group">
                    <Spinner />
                </div>
            )
        }

        if (error) {
            return <ErrorIndicator />
        }

        const filteredBooks = filterBy(books, ['title','author'], label);
        const visibleBooks = filterBy(filteredBooks, ['genre'], genre);

        if(!visibleBooks) {
            return <h3 className='not-found text-muted mg-auto'>Books not found</h3>
        }

        return <BookList books={visibleBooks} onAddedToCart={onAddedToCart} />
        
    }
}

const mapStateToProps = ({books, loading, error}) => {
    return { 
        books, loading, error
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchBooks: fetchBooks(dispatch, ownProps),
        onAddedToCart: (bookId) => {
            dispatch(bookAddedToCart(bookId));
        }
    }
}

export default withBookstoreService()(
    connect(mapStateToProps, mapDispatchToProps)(BookListContainer)
    );