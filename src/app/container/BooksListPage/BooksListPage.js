import React from 'react';
import {deleteBook, getBook, getBooks, postBook, putBook} from '../../service/mockapi'
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
        this.intervalId = setInterval(() => {
            this.refreshBooks()
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
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

    submitBook = (id, book) => {
        if (id > 0) {
            putBook(id, book).then(updatedBook => {
                this.setState({
                    books: this.state.books.map(book => {
                        if (book.id > 0 && book.id === updatedBook.id) {
                            return updatedBook
                        }
                        return book
                    })
                })
            })
        } else {
            postBook(book).then(updatedBook => {
                this.setState({
                    books: this.state.books.map(book => {
                        if (book.id === 0) {
                            return {edited: false, ...updatedBook}
                        }
                        return book
                    })
                })
            })
        }
    }

    refreshBooks = () => {
        getBooks().then((refreshedBooks) => {
            this.setState({
                books: this.state.books.map(lBook => {
                    let similarBook = null
                    refreshedBooks.forEach(rBook => {
                        if (rBook.id === lBook.id) {
                            similarBook = rBook
                        }
                    })
                    if (similarBook && !lBook.edited) {
                        return {
                            edited: false,
                            ...similarBook
                        }
                    }
                    return lBook
                })
            })
        })
    }

    refreshBook = (id) => {
        if (id > 0) {
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
        } else {
            this.refreshBooks()
        }
    }

    deleteBook = (id) => {
        deleteBook(id).then(r => {
            this.setState({
                books: this.state.books.map(book => {
                    if (book.id !== r.id) {
                        return book
                    }
                })
            })
        })
    }

    newBook = () => {
        let books = this.state.books
        if (books[0] && books[0].id !== 0) {
            books.splice(0, 0, {
                id: 0,
                title: "",
                author: "",
                total_amount: 1,
                pages: 1,
                isbn: "",
                edited: true
            });
            this.setState(books)
        }
    }

    render() {
        return <div className="booksPage">
            <Header onNewBook={this.newBook}/>
            <BooksList>
                {
                    this.state.books.map(book => {
                            if (book) {
                                return (
                                    <BookListItem key={book.id} book={book} onBookDidChange={this.bookDidChange}
                                                  onBookSubmit={this.submitBook}
                                                  onBookRefresh={this.refreshBook}
                                                  onBookDelete={this.deleteBook}/>
                                )
                            }
                        }
                    )}
            </BooksList>
        </div>;
    }

}

export default BooksListPage;
