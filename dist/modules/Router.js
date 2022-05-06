var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Route from './Route.js';
var Router = (function () {
    function Router(rootSelector) {
        if (rootSelector === void 0) { rootSelector = null; }
        this._rootSelector = null;
        this._routes = [];
        this._history = window.history;
        this._currentRoute = null;
        this._defaultRoutePathname = null;
        if (Router._instance) {
            if (rootSelector && !Router._instance._rootSelector) {
                Router._instance._rootSelector = rootSelector;
            }
            return Router._instance;
        }
        this._rootSelector = rootSelector;
        Router._instance = this;
    }
    Router.prototype._rootCheck = function () {
        if (!this._rootSelector) {
            throw new Error("".concat(this.constructor.name, ": Instance exist, but root node selector not defined yet"));
        }
    };
    Router.prototype._checkRouteDuplicate = function (pathname) {
        var pathExist = this.getRoute(pathname);
        if (pathExist)
            throw new Error("".concat(this.constructor.name, ": Route on path \"").concat(pathname, "\" already exists"));
    };
    Router.prototype._getExistingRoute = function (pathname) {
        var route = this.getRoute(pathname);
        if (!route)
            throw new Error("".concat(this.constructor.name, ": Route on path \"").concat(pathname, "\" doesn't exist"));
        return route;
    };
    Router.prototype.use = function (pathname, block, context) {
        this._rootCheck();
        this._checkRouteDuplicate(pathname);
        var route = new Route(pathname, block, __assign({ rootQuery: this._rootSelector }, context));
        this._routes.push(route);
        return this;
    };
    Router.prototype.setDefaultRoute = function (pathname) {
        this._getExistingRoute(pathname);
        this._defaultRoutePathname = pathname;
        return this;
    };
    Router.prototype.setBadRouteHandler = function (handler) {
        this._badRouteHandler = handler;
        return this;
    };
    Router.prototype.start = function () {
        var _this = this;
        window.onpopstate = function (event) { return _this._onRoute(event.currentTarget.location.pathname); };
        this._onRoute(window.location.pathname);
    };
    Router.prototype._onRoute = function (pathname) {
        if (this._defaultRoutePathname && pathname.match(/^\/?$/)) {
            console.log(this._defaultRoutePathname);
            this.go(this._defaultRoutePathname);
            return;
        }
        var route = this.getRoute(pathname);
        if (!route) {
            if (this._badRouteHandler)
                this._badRouteHandler();
            else if (this._defaultRoutePathname)
                this.go(this._defaultRoutePathname);
            return;
        }
        if (this._currentRoute)
            this._currentRoute.leave();
        this._currentRoute = route;
        route.render();
    };
    Router.prototype.go = function (path) {
        this._history.pushState(null, '', path);
        this._onRoute(path);
    };
    Router.prototype.back = function () {
        this._history.back();
    };
    Router.prototype.forward = function () {
        this._history.forward();
    };
    Router.prototype.getRoute = function (path) {
        return this._routes.find(function (route) { return route.match(path); });
    };
    Router._instance = null;
    return Router;
}());
export default Router;
