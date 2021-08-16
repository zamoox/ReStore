import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';
import ErrorBoundry from './components/error-boundry';
import { BookstoreServiceProvider } from './components/bookstore-service-context';
import BookstoreService from './services/bookstore-service';
import App from './components/app';

const bookstore = new BookstoreService();

ReactDOM.render(
<Provider store={store}>
    <ErrorBoundry>
        <BookstoreServiceProvider value={bookstore}>
            <Router>
                <App />
            </Router>
        </BookstoreServiceProvider>    
    </ErrorBoundry>
</Provider>, 
document.getElementById('root'));