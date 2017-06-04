# hapi-controllers

Class-based controllers for Hapi Web Apps!

## Features

* Instantiates controller instances on **each request** for improved security
* Controller dependencies injectable via the constructor method
* Route config passed straight through to `server.route()`, so any valid hapi route options will work
* Designed for use in TypeScript projects - happy (hapi!) to accept PRs for ES6

## Usage

```bash
npm install --save hapi-controllers
```

You will need `"experimentalDecorators": true` in your `tsconfig.json` file.

MyController.ts:

```typescript
import { Controller, Route } from 'hapi-controllers';
import { ISomeDependency } from './SomeDependency';

export class MyController extends Controller {

    constructor(private dependency: ISomeDependency) {
        super();
    }

    @Route({
        method: 'GET',
        path: '/stuff'
    })
    public stuffPage() {
        this.reply('This is the stuff page...');
    }

}
```

server.ts

```typescript

import * as Hapi from 'hapi';
import { registerController } from 'hapi-controllers';
import { MyController } from './MyController';
import { SomeDependency } from './SomeDependency';

let deps = new SomeDependency();

let server = new Hapi.Server();
server.connection({ port: 8000 });

registerController(server,
    MyController,
    () => new MyController(deps));

server.start((err) => {
    if (!err) {
        console.log('Server Started.');
    }
});
```

## API

The `Controller` base class has the following properties:

* `this.request` - the Hapi.Request object
* `this.reply` - the Hapi.ReplyNoContinue function relating to the current request

The request and reply are also passed to your controller function if you'd
rather access them that way. The below will work just fine:

```typescript
    @Route({
        method: 'GET',
        path: '/things'
    })
    public thingsPage(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        reply('This is the things page...');
    }
```

## License

MIT