import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';


import './app.css';

import Header from '../header';
import { HomePage, CartPage } from '../pages';
import Spinner from '../spinner';


const App = ({ id }) => {

    const [label, setLabel] = useState('');

    const search = (textFromSearch) => setLabel(textFromSearch);                

    return (
        <>
            <Header onSearch={search}/>
            <Switch>
                <Route path='/' render={ () => <HomePage label={label}/> } exact/>
                <Route path='/cart' render={() => <CartPage/>}/>
                <Route path='/genres' render={() => {}}/>
            </Switch>
        </>
    );
}

export default App;