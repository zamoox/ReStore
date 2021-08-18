import React, { Component } from 'react';
import { connect } from 'react-redux';

import './side-bar.css';
import { booksLoaded, booksRequested, booksError, fetchBooks, bookAddedToCart } from '../../actions';


class SideBar extends Component {

    state = {
        genres: ["fantasy", "science fiction", "novel", "legend", "criminal"],
        iconClass: "toggler fas fa-bars"
    }

    wrapperRef = React.createRef();


    onToggle = () => {
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('is-nav-open');
        let clazz = wrapper.classList.contains('is-nav-open') ? "toggler fas fa-times" :
        "toggler fas fa-bars";
        this.setState({  
            iconClass: clazz    
        })
    }

    handleCheckbox = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    render () {                    

        const { onGenreClick } = this.props;
        const { genres, iconClass } = this.state;

        return (
            <div ref={this.wrapperRef} className="wrapper" id="wrapper">
                <div className="side-bar">
                        <div className="side-bar-content">
                            <span className="head">Genres</span>
                            <ul 
                            className="head-list">
                                {
                                    genres.map((genre, index) => {
                                        return <li
                                        className="active" 
                                        key={index}
                                        onClick={(e) => onGenreClick(e.target.innerHTML)}>
                                            <input 
                                            name="active-item" 
                                            className="custom-checkbox" 
                                            type="radio" 
                                            onChange={this.handleCheckbox}></input>
                                            <label for="active-item">{genre}</label>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <i onClick={this.onToggle} className={iconClass}></i> 
                </div>
            </div>
        );    
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

export default connect()(SideBar);
    