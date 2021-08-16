import React from 'react';
import { connect } from 'react-redux';
import { bookAddedToCart, bookRemovedFromCart, booksDeletedFromCart, booksLoaded } from '../../actions';
import './shopping-cart-table.css';


const Row = ({ item, onIncreased, onDecreased, onDeleted }) => {

    const { id, title, count, total } = item;

    return (
        <tr className="table-info">
            <th scope="row">{id + 1}</th>
            <td>{title}</td>
            <td>{count}</td>
            <td>{total}$</td>
            <td>
                <div className="button-wrap">
                    <button onClick={onDeleted} className="btn btn-sm btn-outline-danger rounded">
                        <svg className="bi bi-trash" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button onClick={onIncreased} className="btn btn-sm btn-outline-success rounded">
                        <span>+</span>
                    </button>
                    <button onClick={onDecreased} className="btn btn-sm btn-outline-warning rounded">
                        <span>-</span>
                    </button>  
                </div>                         
            </td>
        </tr>
    );              
}

const ShoppingCartTable = ({cartItems = [], total, onIncreased, onDeleted, onDecreased}) => {

    console.log(cartItems);
    return (
        <div className="table-wrap container"> 
            <h3 className='text-muted'>Your Order</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">title</th>
                        <th scope="col">count</th>
                        <th scope="col">total</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map((item) => {
                            
                           return <Row 
                            key={item.id}
                            item={item}
                            onIncreased={() => onIncreased(item.id)}
                            onDecreased={() => onDecreased(item.id)}
                            onDeleted={() => onDeleted(item.id)} />
                        })
                    }
                </tbody>
                <tfoot>
                    <tr className="table-light">
                        <th scope="row" colSpan="4">Total</th>
                        <td>
                            <h4>{total}$</h4>
                        </td>
                    </tr>
                </tfoot>
            </table> 
        </div> 
    );
}

const mapStateToProps = ({cartItems = [], total}) => {
    return {
        cartItems, total
    }
}

const mapDispatchToProps = {
    onIncreased: bookAddedToCart,
    onDecreased: bookRemovedFromCart,
    onDeleted: booksDeletedFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);