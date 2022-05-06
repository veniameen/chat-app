var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { assert } from 'chai.js';
import Router from './Router.js';
import Route from './Route.js';
import Component from './Component.js';
var ComponentLike = (function (_super) {
    __extends(ComponentLike, _super);
    function ComponentLike(props) {
        return _super.call(this, props) || this;
    }
    return ComponentLike;
}(Component));
describe('Router.ts: Инициализация', function () {
    it('Синглтон', function () {
        var router1 = new Router();
        var router2 = new Router();
        assert.equal(router1 instanceof Router, true, 'Экземпляр создан');
        assert.equal(router1, router2, 'Возвращён существующий экземпляр');
    });
    it('Пост-инициализация', function () {
        var router = new Router();
        assert.equal(router._rootSelector, null, 'Экземпляр создан, селектор не проинициализирован');
        new Router('.application');
        assert.equal(router._rootSelector, '.application', 'Экземпляр проинициализирован');
        new Router('.app');
        assert.equal(router._rootSelector, '.application', 'Повторная инициализация проигнорирована');
    });
});
describe('Router.ts: Роутинг', function () {
    before(function () {
        var router = new Router('.application');
        router.use('/path', ComponentLike, {});
        router.use('/another/path', ComponentLike, {});
    });
    it('Чейнинг в методе use()', function () {
        var router = new Router();
        var chainLink = router.use('/default/path', ComponentLike, {});
        assert.equal(router, chainLink, 'Возвращается экземпляр роутера');
    });
    it('Метод getRoute()', function () {
        var router = new Router();
        var existedRoute = router.getRoute('/path');
        var undefinedRoute = router.getRoute('/undefined/path');
        assert.equal(existedRoute instanceof Route, true, 'Метод возвращает существующий роут');
        assert.equal(undefinedRoute, undefined, 'Метод возвращает undefined');
    });
});
