
export interface IBooksDatabase {
    getBooks: () => string[];
}

export class BooksDatabase implements IBooksDatabase {
    public getBooks() {
        return [
            'book1',
            'book2',
            'book3'
        ]
    }
}