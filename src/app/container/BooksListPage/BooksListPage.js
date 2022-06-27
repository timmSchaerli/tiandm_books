import React from 'react';
import {getBook, getBooks, putBook} from '../../service/mockapi'
import BookListItem from "../../components/BookListItem/BookListItem";
import BooksList from "../../components/BooksList/BooksList";
import Header from "../../components/Header/Header";
import './BooksListPage.css';

class BooksListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    async componentDidMount() {
        getBooks().then(books => {
            this.setState({
                books: books.map(b => {
                    return {
                        edited: false,
                        ...b
                    }
                })
            })
        })
    }

    bookDidChange = (bookChange) => {
        this.setState({
            books: this.state.books.map(book => {
                if (book.id === bookChange.id) {
                    return {
                        edited: true,
                        ...bookChange
                    }
                }
                return book
            })
        })
    }

    submitBookChanges = (id, book) => {
        putBook(id, book).then(updatedBook => {
            this.setState({
                books: this.state.books.map(book => {
                    if (book.id === updatedBook.id) {
                        return updatedBook
                    }
                    return book
                })
            })
        })
    }

    refreshBook = (id) => {
        getBook(id).then(refreshedBook => {
            this.setState({
                books: this.state.books.map(book => {
                    if (book.id === refreshedBook.id) {
                        return refreshedBook
                    }
                    return book
                })
            })
        })
    }

    render() {
        return (<div>
                <Header/>
                <BooksList>
                    {this.state.books.map(book => (
                        <BookListItem key={book.id} book={book} onBookDidChange={this.bookDidChange}
                                      onBookSubmit={this.submitBookChanges}
                                      onBookRefresh={this.refreshBook}/>
                    ))}
                </BooksList>
            </div>
        );
    }

}

export default BooksListPage;
