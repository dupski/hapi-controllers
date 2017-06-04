
import * as Hapi from 'hapi';

export function Route(config: Hapi.RouteConfiguration) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        if (!target.routes) {
            target.routes = [];
        }
        (config as any).handlerName = methodName;
        target.routes.push(config);
    }
}