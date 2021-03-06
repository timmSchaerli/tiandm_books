import React from 'react';
import './Header.css'

function Header(props) {

    const onNewBookButtonPressed = () => {
        props.onNewBook()
    }

    return (
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <h3> ti&m Books Assessment</h3>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" className="nav-link px-2 link-secondary">Books</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Features</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    <button type="button" className="btn btn-outline-primary me-2" onClick={onNewBookButtonPressed}>Add New Book</button>
                </div>
            </header>
    );
}

export default Header;

