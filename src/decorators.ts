
import * as Hapi from 'hapi';

export function Route(config: Hapi.IRouteConfiguration) {
    if (config.handler) {
        throw new Error('@Route() - You must not define the handler attribute');
    }
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        if (!target.routes) {
            target.routes = [];
        }
        config.handler = methodName;
        target.routes.push(config);
    }
}