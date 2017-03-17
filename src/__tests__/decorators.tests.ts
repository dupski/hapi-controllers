
import { expect } from 'chai';
import { Controller } from '../Controller';
import { Route } from '../decorators';

describe('@Route decorator', () => {

    it('adds a routes property to the class prototype', () => {
        let route1 = {
            method: 'GET',
            path: '/flibble'
        }
        let route2 = {
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
        expect(routes[0].handler).to.equal('method1');

        expect(routes[1].method).to.equal(route2.method);
        expect(routes[1].path).to.equal(route2.path);
        expect(routes[1].handler).to.equal('method2');
    });

    it('throws an error if config.handler is set', () => {
        expect(() => {
            class MyController {
                @Route({
                    method: 'GET',
                    path: '/wibble',
                    handler: 'george'
                })
                method() {}
            }
        }).to.throw('You must not define the handler attribute');
    })

});