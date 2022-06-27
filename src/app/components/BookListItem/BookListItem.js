import {getBookThumbnail} from "../../service/googleapi";
import './BookListItem.css';

function BookListItem(props) {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <img src={getBookThumbnail(props.book.isbn)} alt={props.book.title}/>
                <div className="card-body">
                    <div className="title">
                    <h3>
                        {props.book.title}
                    </h3>
                    </div>
                    <p className="card-text">
                        Amount: {props.book.total_amount} <br/>
                        Author: {props.book.author} <br/>
                        ISBN: {props.book.isbn}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                        </div>
                        <small className="text-muted">{props.book.pages} Pages</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookListItem;
