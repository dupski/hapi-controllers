
import * as Hapi from 'hapi';
import { registerController } from '../';
import { BooksController } from './BooksController';
import { IBooksDatabase, BooksDatabase } from './BooksDatabase';

let server = new Hapi.Server();
server.connection({ port: 8000 });

let database: IBooksDatabase = new BooksDatabase();

registerController(server, BooksController,
    () => new BooksController(database));

server.start((err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Server Started.');
    }
});