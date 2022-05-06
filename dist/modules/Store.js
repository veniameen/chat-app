import EventBus from './EventBus.js';
import { set } from '../utils/objectHandlers.js';
import cloneDeep from '../utils/cloneDeep.js';
var Store = (function () {
    function Store() {
        if (Store._instance)
            return Store._instance;
        Store._instance = this;
        this.eventBus = new EventBus();
        this._store = {};
        this._isStrictMode = false;
    }
    Store.prototype.flush = function () {
        this._store = {};
    };
    Store.prototype.set = function (path, data) {
        this._raiseErrorIfPathNotString(path);
        set(this._store, path, cloneDeep(data));
        this._emit(path);
    };
    Store.prototype.get = function (path) {
        this._raiseErrorIfPathNotString(path);
        var data = this._getByPathOrRaiseError(path);
        return cloneDeep(data);
    };
    Store.prototype.rewrite = function (path, data) {
        this._raiseErrorIfPathNotString(path);
        var target = this._getHost(path);
        set(this._store, path, null);
        target.host[target.key] = cloneDeep(data);
        this._emit(path);
    };
    Store.prototype.delete = function (path) {
        this._raiseErrorIfPathNotString(path);
        var target = this._getHost(path);
        this._raiseErrorIfHasNoProperty(target.host, target.key, path);
        delete target.host[target.key];
    };
    Store.prototype.enableStrictMode = function () {
        this._isStrictMode = true;
    };
    Store.prototype.disableStrictMode = function () {
        this._isStrictMode = true;
    };
    Store.prototype._getHost = function (path) {
        var pathKeys = path.split('.');
        if (pathKeys.length === 0)
            throw new Error("".concat(this.constructor.name, ": Root operations is prohibited"));
        var targetKey = pathKeys.pop();
        var reducedPath = pathKeys.join('.');
        var targetObject = this._getByPathOrRaiseError(reducedPath);
        return {
            host: targetObject,
            key: targetKey,
        };
    };
    Store.prototype._getByPathOrRaiseError = function (path) {
        var _this = this;
        var pathKeys = path.split('.');
        return pathKeys.reduce(function (target, key) {
            _this._raiseErrorIfHasNoProperty(target, key, path);
            if (!target && !_this._isStrictMode)
                return undefined;
            return target[key];
        }, this._store);
    };
    Store.prototype._raiseErrorIfHasNoProperty = function (target, key, fullPath) {
        if (!this._isStrictMode)
            return;
        if (!target.hasOwnProperty(key)) {
            throw new Error("".concat(this.constructor.name, ": Key '").concat(key, "' of path '").concat(fullPath, "' doesn't exist in store"));
        }
    };
    Store.prototype.forceEmit = function (path) {
        this.eventBus.emit(path);
    };
    Store.prototype.subscribe = function (path, callback) {
        this.eventBus.subscribe(path, callback);
    };
    Store.prototype.unsubscribe = function (path, callback) {
        this.eventBus.unsubscribe(path, callback);
    };
    Store.prototype._emit = function (path) {
        var _this = this;
        var pathKeys = path.split('.');
        pathKeys.reduce(function (partial, current) {
            partial = [partial, current].filter(Boolean).join('.');
            _this.eventBus.emit(partial);
            return partial;
        }, '');
    };
    Store.prototype._raiseErrorIfPathNotString = function (path) {
        if (typeof path !== 'string')
            throw new Error("".concat(this.constructor.name, ": Type of 'path' must be string"));
    };
    return Store;
}());
export default Store;
