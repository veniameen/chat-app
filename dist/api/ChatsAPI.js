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
var ChatsAPI = (function (_super) {
    __extends(ChatsAPI, _super);
    function ChatsAPI() {
        return _super.call(this) || this;
    }
    ChatsAPI.prototype.getChat = function (data) {
        return this.get('/chats', { data: data });
    };
    ChatsAPI.prototype.getArchived = function (data) {
        return this.get('/chats/archive', { data: data });
    };
    ChatsAPI.prototype.createChat = function (data) {
        return this.post('/chats', { data: data });
    };
    ChatsAPI.prototype.deleteChat = function (data) {
        return this.delete('/chats', { data: data });
    };
    ChatsAPI.prototype.archiveChat = function (data) {
        return this.post('/chats/archive', { data: data });
    };
    ChatsAPI.prototype.unArchiveChat = function (data) {
        return this.post('/chats/unarchive', { data: data });
    };
    ChatsAPI.prototype.getUsers = function (chatID) {
        return this.get("/chats/".concat(chatID, "/users"));
    };
    ChatsAPI.prototype.getNewMessagesCount = function (chatID) {
        return this.get("/chats/new/".concat(chatID));
    };
    ChatsAPI.prototype.uploadAvatar = function (data) {
        return this.put('/chats/avatar', { data: data });
    };
    ChatsAPI.prototype.addUser = function (data) {
        return this.put('/chats/users', { data: data });
    };
    ChatsAPI.prototype.deleteUser = function (data) {
        return this.delete('/chats/users', { data: data });
    };
    ChatsAPI.prototype.getToken = function (chatID) {
        return this.post("/chats/token/".concat(chatID));
    };
    return ChatsAPI;
}(API));
export var chatsAPI = new ChatsAPI();
