const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_LOAD',
        payload: newBooks
    }
}

const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
}

const booksError = (err) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: err
    }
}

const fetchBooks = (dispatch, ownProps) => () => {
    const { bookstoreService } = ownProps;
    dispatch(booksRequested());
    bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((error) => dispatch(booksError(error)));
}

const bookAddedToCart = (bookId) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId
    }
}

const bookRemovedFromCart = (bookId) => {
    return {
        type: 'BOOK_REMOVED_FROM_CART',
        payload: bookId
    }
}

const booksDeletedFromCart = (bookId) => {
    return {
        type: 'BOOKS_DELETED_FROM_CART',
        payload: bookId
    }
}





export {
    booksLoaded,
    booksRequested,
    booksError,
    fetchBooks,
    bookAddedToCart,
    bookRemovedFromCart,
    booksDeletedFromCart
};