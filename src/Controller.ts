
import * as Hapi from 'hapi';

export class Controller {
    protected request: Hapi.Request;
    protected reply: Hapi.IReply;

    setRequestContext(request: Hapi.Request, reply: Hapi.IReply) {
        this.request = request;
        this.reply = reply;
    }
}