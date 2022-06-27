import React from 'react';
import {getBooks} from '../../service/mockapi'
import BookListItem from "../../components/BookListItem/BookListItem";
import BooksList from "../../components/BooksList/BooksList";
import Header from "../../components/Header/Header";

class BooksListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    async componentDidMount() {
        getBooks().then(books => {
            this.setState({books: books})
        })
    }

    render() {
        return (<div>
            <Header/>
                <BooksList>
                    {this.state.books.map(book => (
                        <BookListItem key={book.id} book={book}/>
                    ))}
                </BooksList>
            </div>
        );
    }

}

export default BooksListPage;
