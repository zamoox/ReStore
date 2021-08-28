import React, { useState } from 'react';
import BookList from '../book-list';
import SideBar from '../side-bar';

import './pages.css';

const HomePage = ({label}) => {

    const [ genre, setGenre ] = useState('');

    return (
        <div className="home-page">
            <div className="Row">
                    <SideBar onGenreClick={(genre) => setGenre(genre)}/>
                    <BookList genre={genre} label={label}/>
            </div>
        </div>
    );
}

export default HomePage;