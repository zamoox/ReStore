import React, { Component } from 'react';
import { connect } from 'react-redux';

import './book-list.css';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError, fetchBooks, bookAddedToCart } from '../../actions';
import { filterBy } from '../../utils'; 


const BookList = ({books, onAddedToCart, viewMode}) => {
    return (
            <div className={viewMode}>
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

    state = {
        isActiveIcon: 'false'
    }

    componentDidMount () {
        this.props.fetchBooks();
    }


    toggleViewMode () {
        this.setState(state => {
            return {
             isActiveIcon: !state.isActiveIcon
            }
        })
    }

    render () {
        const { books, loading, error, label, genre, onAddedToCart } = this.props;
        const { isActiveIcon } = this.state;

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

        return (
            <div className="list-group-wrapper">
                <div className="view-mode-wrapper">
                    <div className="view-mode">
                        <i 
                        className="fas fa-list active-view-icon"
                        onClick={() => {}}></i>
                        <i className="fas fa-th-large"
                        onClick={() => {}}></i>
                    </div>    
                </div>
                <BookList books={visibleBooks} onAddedToCart={onAddedToCart} viewMode={"list-group"}/>
            </div> 
        )
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