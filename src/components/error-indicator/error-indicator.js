import React from 'react';
import './error-indicator.css';

const ErrorIndicator = () => {
    return (
        <div className='error-wrap'>
            <div class="jumbotron">
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <h4 className="alert-heading">You've got an error, хлопче!</h4>
                    <p className="mb-0">Component Did Catch method has been trigerred.</p>
                </div>
            </div>
        </div>    
    );
}

export default ErrorIndicator;