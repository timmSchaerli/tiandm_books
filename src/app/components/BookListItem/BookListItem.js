import {getBookThumbnail} from "../../service/googleapi";
import './BookListItem.css';
import {useState} from "react";

function BookListItem(props) {
    let [isEdit, setEdit] = useState(false),
     [title, setTitle] = useState(props.book.title),
     [author, setAuthor] = useState(props.book.author),
     [pages, setPages] = useState(props.book.pages),
     [total_amount, setTotalAmount] = useState(props.book.total_amount),
     [isbn, setISBN] = useState(props.book.isbn)

    const editButtonPressed = () => {
        setEdit(true)
    }


    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            const b = props.book
            if (title+author+pages+total_amount+isbn !== b.title+b.author+b.pages+b.total_amount+b.isbn) {
                props.onBookDidChange({
                    id: props.book.id,
                    title: title !== "" ? title : props.book.title,
                    author: author !== "" ? author : props.book.author,
                    pages: pages !== "" ? pages : props.book.pages,
                    total_amount: total_amount !== "" ? total_amount : props.book.total_amount,
                    isbn: isbn !== "" ? isbn : props.book.isbn
                })
            }
            setEdit(false);
        }
    }

    const renderChangedButtons = (props) => {
        if (props.book.edited) {
            return <div className="editedButtons">
                <button onClick={onRefreshClicked} className="btn btn-primary">Reload Book</button>
                <button onClick={onSubmitChanges} className="btn btn-primary">Submit Changes</button></div>
        }
    }

    const onRefreshClicked = () => {
        props.onBookRefresh(props.book.id)
    }

    const onSubmitChanges = () => {
        props.onBookSubmit(props.book.id, {title, author, pages, total_amount, isbn})
    }

    const renderCardContent = (props) => {
        if (isEdit) {
            return (<div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">title</span>
                        <input type="text" className="form-control" placeholder="title" aria-label="title" value={title}
                               aria-describedby="basic-addon1" onKeyDown={onKeyDown} onChange={(e) => {setTitle(e.target.value)}}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">author</span>
                        <input type="text" className="form-control" placeholder="author" aria-label="author" value={author}
                               aria-describedby="basic-addon1" onKeyDown={onKeyDown} onChange={(e) => {setAuthor(e.target.value)}}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">total amount</span>
                        <input type="text" className="form-control" placeholder="total_amount" aria-label="total_amount" value={total_amount}
                               aria-describedby="basic-addon1" onKeyDown={onKeyDown} onChange={(e) => {setTotalAmount(e.target.value)}}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">ISBN</span>
                        <input type="text" className="form-control" placeholder="isbn" aria-label="isbn" value={isbn}
                               aria-describedby="basic-addon1" onKeyDown={onKeyDown}
                               onChange={(e) => {setISBN(e.target.value)}}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">pages</span>
                        <input type="text" className="form-control" placeholder="pages" aria-label="pages" value={pages}
                               aria-describedby="basic-addon1" onKeyDown={onKeyDown} onChange={(e) => {setPages(e.target.value)}}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="card-body">
                    <div className="title">
                        <h3>{props.book.title}</h3>
                    </div>
                    <p className="card-text">
                        Amount: {props.book.total_amount} <br/>
                        Author: {props.book.author} <br/>
                        ISBN: {props.book.isbn}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary"
                                    onClick={editButtonPressed}>Edit
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                        </div>
                        <small className="text-muted">{props.book.pages} Pages</small>
                    </div>
                </div>)
        }
    }


    return (
        <div className="col">
            <div className="card shadow-sm">
                {renderChangedButtons(props)}
                <img src={getBookThumbnail(props.book.isbn)} alt={props.book.title}/>
                {renderCardContent(props)}
            </div>
        </div>
    );
}

export default BookListItem;
