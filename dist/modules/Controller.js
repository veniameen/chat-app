import Router from './Router.js';
import { Routes } from '../index.js';
import Store from './Store.js';
import { storeMap, httpErrorCodes } from '../config.js';
var router = new Router();
var store = new Store();
var errorProps = storeMap.errorPageProps;
var Controller = (function () {
    function Controller() {
    }
    Controller.prototype.go = function (path) {
        router.go(path);
    };
    Controller.prototype.back = function () {
        router.back();
    };
    Controller.prototype.storeSet = function (path, data) {
        store.set(path, data);
    };
    Controller.prototype.storeGet = function (path) {
        return store.get(path);
    };
    Controller.prototype.storeDelete = function (path) {
        store.delete(path);
    };
    Controller.prototype.storeRewrite = function (path, data) {
        store.rewrite(path, data);
    };
    Controller.prototype.storeForceEmit = function (path) {
        store.forceEmit(path);
    };
    Controller.prototype.statusHandler = function (status, descriptions) {
        if (descriptions === void 0) { descriptions = null; }
        if (status < 400)
            return false;
        var description = '';
        if (descriptions && descriptions.hasOwnProperty(status)) {
            description = descriptions[status];
        }
        else if (httpErrorCodes.hasOwnProperty(status)) {
            description = httpErrorCodes[status];
        }
        else {
            description = httpErrorCodes.default;
        }
        var props = { type: status, description: description };
        store.set(errorProps, props);
        this.go(Routes.error);
        return true;
    };
    return Controller;
}());
export default Controller;
