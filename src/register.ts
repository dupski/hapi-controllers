
import * as Hapi from 'hapi';
import { Controller } from './Controller';

export function registerController<T extends Controller>(
                    server: Hapi.Server,
                    controller: any,  // PR welcome for this 'any' !... :)
                    initFn: () => T) {

    if (!controller.prototype.routes) {
        throw new Error(`registerController() ${controller.name} has no routes defined`);
    }
    else {
        for (let route of controller.prototype.routes) {
            route.handler = (request: Hapi.Request, reply: Hapi.IReply) => {
                let ctrl = initFn() as any;
                ctrl.setRequestContext(request, reply);
                return ctrl[route.handlerName](request, reply);
            }
            server.route(route);
        }
    }

}