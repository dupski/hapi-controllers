
import { expect } from 'chai';
import { Controller } from '../Controller';
import { Route } from '../decorators';
import { RouteConfiguration } from "hapi";

describe('@Route decorator', () => {

    it('adds a routes property to the class prototype', () => {
        let route1: RouteConfiguration = {
            method: 'GET',
            path: '/flibble'
        }
        let route2: RouteConfiguration = {
            method: ['GET','POST'],
            path: '/jibble'
        }

        class MyController {
            @Route(route1)
            method1() {}

            @Route(route2)
            method2() {}
        }

        let ctrl: any = MyController;
        expect(ctrl.prototype.routes).to.exist;

        let routes = ctrl.prototype.routes;
        expect(routes[0].method).to.equal(route1.method);
        expect(routes[0].path).to.equal(route1.path);
        expect(routes[0].handlerName).to.equal('method1');

        expect(routes[1].method).to.equal(route2.method);
        expect(routes[1].path).to.equal(route2.path);
        expect(routes[1].handlerName).to.equal('method2');
    });

});