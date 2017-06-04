
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Controller } from '../Controller';
import { Route } from '../decorators';
import { registerController } from '../register';
import { RouteConfiguration } from 'hapi';

let route1: RouteConfiguration = {
    method: 'GET',
    path: '/flibble'
}
let route2: RouteConfiguration = {
    method: ['GET','POST'],
    path: '/jibble'
}

let ctorSpy: sinon.SinonSpy;
let method1Spy: sinon.SinonSpy;
let method2Spy: sinon.SinonStub;
let currentInstance: MyController = null;

let serverRoutes: any[];
let server = {
    route: (route: any) => {
        serverRoutes.push(route)
    }
} as any;

class MyController extends Controller {
    constructor(...args: any[]) {
        super();
        ctorSpy(...args);
        currentInstance = this;
    }
    @Route(route1)
    method1(...args: any[]) {
        method1Spy(...args);
    }
    @Route(route2)
    method2(...args: any[]) {
        return method2Spy(...args);
    }
    getContext() {
        return [this.request, this.reply];
    }
}

let routes = (MyController.prototype as any).routes;

class NoRoutes extends Controller {}

describe('registerController()', () => {

    beforeEach(() => {
        ctorSpy = sinon.spy();
        method1Spy = sinon.spy();
        method2Spy = sinon.stub().returns('ret_val');
        serverRoutes = [];
    })

    it('throws if no routes are defined', () => {
        expect(() => {
            registerController(server,
                NoRoutes,
                () => new NoRoutes());
        }).to.throw('NoRoutes has no routes defined');
    });

    it('sets up a server route for each route', () => {
        registerController(server,
            MyController,
            () => new MyController());
        
        expect(serverRoutes.length).to.equal(2);
        expect(serverRoutes[0].path).to.equal(routes[0].path)
        expect(serverRoutes[1].path).to.equal(routes[1].path)
    });

    it('controller is initialised as per the init function on each request', () => {
        registerController(server,
            MyController,
            () => new MyController(10, 20));
        
        serverRoutes[0].handler('request1', 'reply1');
        serverRoutes[1].handler('request2', 'reply2');
        
        expect(ctorSpy.callCount).to.equal(2);
        expect(ctorSpy.getCall(0).args).to.deep.equal([10, 20]);
        expect(ctorSpy.getCall(1).args).to.deep.equal([10, 20]);
    });

    it('controller receives request context', () => {
        registerController(server,
            MyController,
            () => new MyController(10, 20));
        
        serverRoutes[0].handler('request1', 'reply1');
        
        expect(ctorSpy.callCount).to.equal(1);
        expect(currentInstance.getContext()).to.deep.equal(['request1', 'reply1']);
    });

    it('controller method is called with request and reply', () => {
        registerController(server,
            MyController,
            () => new MyController(10, 20));
        
        serverRoutes[0].handler('request1', 'reply1');
        
        expect(ctorSpy.callCount).to.equal(1);
        expect(method1Spy.callCount).to.equal(1);
        expect(method1Spy.getCall(0).args).to.deep.equal(['request1', 'reply1']);
    });

    it('controller method result is returned', () => {
        registerController(server,
            MyController,
            () => new MyController(10, 20));
        
        let retVal = serverRoutes[1].handler('request1', 'reply1');
        
        expect(ctorSpy.callCount).to.equal(1);
        expect(method2Spy.callCount).to.equal(1);
        expect(retVal).to.equal('ret_val');
    });

});