
import * as Hapi from 'hapi';

export class Controller {
    protected request: Hapi.Request;
    protected reply: Hapi.ReplyNoContinue;

    setRequestContext(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        this.request = request;
        this.reply = reply;
    }
}