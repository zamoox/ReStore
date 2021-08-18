import React from 'react';
import { connect } from 'react-redux';
import './main-navigation.css';

class MainNavigation extends React.Component {

    render() {


        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <ul className="breadcrumbs">
                    <li>Home</li>
                    <li>Cart</li>
                </ul>    
            </nav>    
        );
    }

}

const mapStateToProps = () => {
    
}

export default connect(mapStateToProps)(MainNavigation);