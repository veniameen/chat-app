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
var UsersAPI = (function (_super) {
    __extends(UsersAPI, _super);
    function UsersAPI() {
        return _super.call(this) || this;
    }
    UsersAPI.prototype.changeProfile = function (data) {
        return this.put('/user/profile', { data: data });
    };
    UsersAPI.prototype.changeAvatar = function (data) {
        return this.put('/user/profile/avatar', {
            data: data,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };
    UsersAPI.prototype.changePassword = function (data) {
        return this.put('/user/password', { data: data });
    };
    UsersAPI.prototype.getByID = function (id) {
        return this.get("/user/".concat(id));
    };
    UsersAPI.prototype.searchByLogin = function (data) {
        return this.post('/user/search', { data: data });
    };
    return UsersAPI;
}(API));
export var usersAPI = new UsersAPI();
