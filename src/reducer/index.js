
const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    total: 210
}


const updateOrder = (state, bookId, quantity) => {
    const { cartItems, books } = state;
    const book = books.find(({id}) =>  id === bookId );
    const idx = cartItems.findIndex(({id}) => bookId === id );
    const item = cartItems[idx];
    const newItem = updateCartItem(book, item, quantity);
    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, idx)
    }
} 

const updateCartItem = (book, item = {}, quantity) => {

    const { 
        id = book.id, title = book.title, count = 0, total = 0 
    } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    }

}

const updateCartItems = ( cartItems, item, idx ) => {

    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    }

    if ( idx === -1 ) {
        return [ ...cartItems, item ]
    }
        return [
                ...cartItems.slice(0, idx),
                item,
                ...cartItems.slice(idx + 1)
            ];   
}

const reducer = (state = initialState, actions) => {
    switch(actions.type) {
        case 'FETCH_BOOKS_LOAD': 
            return {
                ...state,
                books: actions.payload,
                loading: false,
                error: null
            }
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            }
        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: actions.payload
            }
        case 'BOOK_ADDED_TO_CART':
            return updateOrder(state, actions.payload, 1);
        case 'BOOK_REMOVED_FROM_CART':    
            return updateOrder(state, actions.payload, -1);
        case 'BOOKS_DELETED_FROM_CART':
            const item = state.cartItems.find(({id}) => id === actions.payload);
            return updateOrder(state, actions.payload, -item.count);    
            
        default: 
            return state;    
    }
}

export default reducer;