import React from 'react';
import { BookstoreServiceConsumer } from '../bookstore-service-context';

const withBookstoreService = () => (Wrapped) => {
    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {(value) => {
                    return <Wrapped {...props} 
                    bookstoreService={value}/>
                }}
            </BookstoreServiceConsumer>
        );
    }
}

export { withBookstoreService };