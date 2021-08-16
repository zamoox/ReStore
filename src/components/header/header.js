import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.css';

import SearchPanel from "../search-panel";

class Header extends React.Component {

    render() {

        const { onSearch, cartItems } = this.props;
        let itemsCount = 0;

        
        if (cartItems.length > 0) {

            itemsCount = cartItems.reduce((sum, current) => {
                return sum += current.count;
            }, itemsCount);

            const el = document.getElementById('items-count');
            el.style.display = 'inline-block';
        }


        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link to="/" className="navbar-brand">
                    Re-Store
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/' className="nav-link" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/genres' className="nav-link">Genres</Link>
                        </li> 
                    </ul>

                    <div className='cart-wrap'>
                        <Link to='/cart' className="nav-link">
                            <i className="cart far fa-shopping-cart"></i>
                            <span id="items-count">{itemsCount}</span>
                        </Link>    
                    </div> 

                    <SearchPanel onSearch={(value) => onSearch(value)}/>

                </div>
            </nav>    
        );
    }

}

const mapStateToProps = ({cartItems}) => {
    return {
        cartItems
    }
}

export default connect(mapStateToProps)(Header);