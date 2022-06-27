import React from 'react';

function BooksList(props) {
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 row-cols-xs-1 g-3">
                {props.children}
            </div>
        </div>
    );
}

export default BooksList;
