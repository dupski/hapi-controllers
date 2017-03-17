
import { expect } from 'chai';
import { Controller } from '../Controller';

describe('Controller class', () => {

    it('can be instantiated', () => {
        expect(() => {
            new Controller();
        }).to.not.throw();
    });

    it('setRequestContext() works', () => {
        let ctrl = new Controller() as any;
        ctrl.setRequestContext(1, 2);
        expect(ctrl.request).to.equal(1);
        expect(ctrl.reply).to.equal(2);
    });

});