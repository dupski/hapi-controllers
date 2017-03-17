
import { Controller, Route } from '../';
import { IBooksDatabase } from './BooksDatabase';

export class BooksController extends Controller {

    constructor(private booksDB: IBooksDatabase) {
        super();
    }

    @Route({
        method: 'GET',
        path: '/'
    })
    public home() {
        this.reply('Welcome to BookSite! <a href="/books">Click Here</a> for books!...');
    }

    @Route({
        method: 'GET',
        path: '/books'
    })
    public getBooks() {
        let bookList = this.booksDB.getBooks();
        this.reply('Books: ' + bookList.join(', '));
    }

}