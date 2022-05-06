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
import { API } from './API.js';
var AuthAPI = (function (_super) {
    __extends(AuthAPI, _super);
    function AuthAPI() {
        return _super.call(this) || this;
    }
    AuthAPI.prototype.signUp = function (data) {
        return this.post('/auth/signup', { data: data });
    };
    AuthAPI.prototype.signIn = function (data) {
        return this.post('/auth/signin', { data: data });
    };
    AuthAPI.prototype.getUserInfo = function () {
        return this.get('/auth/user');
    };
    AuthAPI.prototype.logout = function () {
        return this.post('/auth/logout');
    };
    return AuthAPI;
}(API));
export var authAPI = new AuthAPI();
