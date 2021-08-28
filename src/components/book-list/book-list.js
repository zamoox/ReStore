import React, { Component } from 'react';
import { connect } from 'react-redux';

import './book-list.css';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { filterBy } from '../../utils'; 


const BookList = ({books, onAddedToCart, viewMode}) => {

    const view = viewMode === 'list' ? "item-list list-group container" : "block-list list-group container" ;

    return (
            <div className={view}>
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}>
                                <BookListItem 
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id)} 
                                viewMode={viewMode}
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
        viewMode: 'list'
    }

    componentDidMount () {
        this.props.fetchBooks();
    }


    toggleViewMode = (e) => {
        const elem = e.target;
        const iconList = document.getElementsByClassName('fas fa-list')[0];
        const iconBlocks = document.getElementsByClassName('fas fa-th-large')[0];

        // list mode
        if (elem === iconList) {
            iconList.classList.add('active-view-icon');
            iconBlocks.classList.remove('active-view-icon');
            this.setState({
                viewMode: 'list'
            })
        }
        // blocks mode
        else if (elem === iconBlocks) {
            iconBlocks.classList.add('active-view-icon');
            iconList.classList.remove('active-view-icon');
            this.setState({
                viewMode: 'blocks'
            })
        }
        
    }

    render () {
        const { books, loading, error, label, genre, onAddedToCart } = this.props;
        const { viewMode } = this.state;

        if (loading) {
            return (
                <div className="item-list list-group">
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
                        onClick={this.toggleViewMode}></i>
                        <i className="fas fa-th-large"
                        onClick={this.toggleViewMode}></i>
                    </div>    
                </div>
                <BookList books={visibleBooks} onAddedToCart={onAddedToCart} viewMode={viewMode}/>
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