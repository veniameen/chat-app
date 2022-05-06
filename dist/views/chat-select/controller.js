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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Controller from '../../modules/Controller.js';
import { chatsAPI } from '../../api/ChatsAPI.js';
import { usersAPI } from '../../api/UsersAPI.js';
import { SETTINGS, storeMap } from '../../config.js';
import splitTimestamp from '../../utils/splitTimestamp.js';
import { authAPI } from '../../api/AuthAPI.js';
import WebSocketTransport from '../../modules/WebSocketTransport.js';
var ChatsController = (function (_super) {
    __extends(ChatsController, _super);
    function ChatsController() {
        var _this = _super.call(this) || this;
        _this._socket = new WebSocketTransport(SETTINGS.wssURL);
        _this._socket.subscribe(WebSocketTransport.EVENTS.RECEIVED, _this._socketMessageHandler.bind(_this));
        _this._socket.subscribe(WebSocketTransport.EVENTS.OPENED, _this._socketOpenedHandler.bind(_this));
        return _this;
    }
    ChatsController.prototype.getChats = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, chatsAPI.getChat(data)];
                    case 1:
                        response = _a.sent();
                        return [2, response.response];
                    case 2:
                        e_1 = _a.sent();
                        this.statusHandler(e_1.status);
                        return [3, 3];
                    case 3: return [2, null];
                }
            });
        });
    };
    ChatsController.prototype.createChat = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, getActiveChat, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4, chatsAPI.createChat(data)];
                    case 1:
                        response = _a.sent();
                        getActiveChat = this.storeGet(storeMap.activeChatID);
                        return [4, this.updateChatList()];
                    case 2:
                        _a.sent();
                        if (!getActiveChat) return [3, 4];
                        return [4, this.getUsers(getActiveChat)];
                    case 3:
                        _a.sent();
                        this.storeSet(storeMap.chatPageProps + '.chatSelected', true);
                        return [3, 5];
                    case 4:
                        this.storeSet(storeMap.activeChatID, null);
                        this.storeSet(storeMap.chatPageProps + '.chatSelected', false);
                        _a.label = 5;
                    case 5: return [2, response.response];
                    case 6:
                        e_2 = _a.sent();
                        this.statusHandler(e_2.status);
                        return [3, 7];
                    case 7: return [2, null];
                }
            });
        });
    };
    ChatsController.prototype.deleteChat = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, chatsAPI.deleteChat(data)];
                    case 1:
                        response = _a.sent();
                        return [4, this.updateChatList()];
                    case 2:
                        _a.sent();
                        this.storeSet(storeMap.chatPageProps + '.chatSelected', false);
                        this.storeSet(storeMap.activeChatID, null);
                        return [2, response.response];
                    case 3:
                        e_3 = _a.sent();
                        this.statusHandler(e_3.status);
                        return [3, 4];
                    case 4: return [2, null];
                }
            });
        });
    };
    ChatsController.prototype._getUnread = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, chatsAPI.getNewMessagesCount(chatID)];
                    case 1:
                        response = _a.sent();
                        return [2, response.response];
                    case 2:
                        e_4 = _a.sent();
                        this.statusHandler(e_4.status);
                        return [3, 3];
                    case 3: return [2, null];
                }
            });
        });
    };
    ChatsController.prototype.chatSelectHandler = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            var chatToken, userID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getChatToken(chatID)];
                    case 1:
                        chatToken = _a.sent();
                        userID = this.storeGet(storeMap.currentUserID);
                        this.storeRewrite(storeMap.activeChatFeed, []);
                        this.storeSet(storeMap.activeChatID, chatID);
                        this.storeSet(storeMap.chatPageProps + '.activeChatID', true);
                        this._socket.open("/chats/".concat(userID, "/").concat(chatID, "/").concat(chatToken));
                        return [2];
                }
            });
        });
    };
    ChatsController.prototype.sendMessage = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                message = JSON.stringify({
                    type: 'message',
                    content: text,
                });
                this._socket.send(message);
                return [2];
            });
        });
    };
    ChatsController.prototype._requestOldMessages = function (offset) {
        if (offset === void 0) { offset = 0; }
        this._socket.send(JSON.stringify({
            content: offset,
            type: 'get old',
        }));
    };
    ChatsController.prototype._socketOpenedHandler = function () {
        this._requestOldMessages();
    };
    ChatsController.prototype._parseMessage = function (message, userID) {
        var time = splitTimestamp(message.time).hhmm;
        return {
            text: message.content,
            attachmentType: false,
            attachmentSource: false,
            datetime: message.time,
            time: time,
            isOwner: message.user_id === userID,
            isRead: true,
        };
    };
    ChatsController.prototype._getUserIdByLogin = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, user, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, usersAPI.searchByLogin(data)];
                    case 1:
                        userData = _a.sent();
                        user = userData.response.filter(function (user) { return user.login === data.login; });
                        if (!user.length) {
                            alert("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ".concat(data.login, " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"));
                            return [2, null];
                        }
                        return [2, user[0].id];
                    case 2:
                        e_5 = _a.sent();
                        this.statusHandler(e_5.status);
                        return [3, 3];
                    case 3: return [2, null];
                }
            });
        });
    };
    ChatsController.prototype.pageUnmountHandler = function () {
        this._socket.close();
        this.storeSet(storeMap.activeChatID, null);
        this.storeSet(storeMap.chatPageProps + '.chatSelected', false);
        this.storeRewrite(storeMap.activeChatFeed, []);
        this.storeRewrite(storeMap.chatPageProps, null);
    };
    ChatsController.prototype._getChatToken = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, chatsAPI.getToken(chatID)];
                    case 1:
                        response = _a.sent();
                        return [2, response.response['token']];
                    case 2:
                        e_6 = _a.sent();
                        this.statusHandler(e_6.status);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ChatsController.prototype.pageMountHandler = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, authAPI.getUserInfo()];
                    case 1:
                        response = _a.sent();
                        this.storeSet(storeMap.currentUserID, response.response['id']);
                        return [3, 3];
                    case 2:
                        e_7 = _a.sent();
                        return [2];
                    case 3: return [4, this.updateChatList()];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ChatsController.prototype.updateChatList = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var chats, _i, chats_1, chat, lastMessage, unread;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getChats(data)];
                    case 1:
                        chats = _a.sent();
                        if (!chats) {
                            return [2];
                        }
                        _i = 0, chats_1 = chats;
                        _a.label = 2;
                    case 2:
                        if (!(_i < chats_1.length)) return [3, 5];
                        chat = chats_1[_i];
                        if (chat.avatar === null) {
                            chat.avatar = SETTINGS.avatarDummy;
                        }
                        lastMessage = chat.last_message;
                        if (lastMessage) {
                            if (lastMessage.content.length > 25) {
                                chat.last = lastMessage.content.slice(0, 25) + '...';
                            }
                            else {
                                chat.last = lastMessage.content;
                            }
                            chat.time = splitTimestamp(lastMessage.time).hhmm;
                        }
                        else {
                            chat.last = '';
                            chat.time = '';
                        }
                        return [4, this._getUnread(chat.id)];
                    case 3:
                        unread = _a.sent();
                        if (unread) {
                            chat.unreads = unread.unread_count;
                        }
                        else {
                            chat.unreads = 0;
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5:
                        this.storeRewrite(storeMap.chatPageProps, { chats: chats });
                        return [2];
                }
            });
        });
    };
    ChatsController.prototype.addUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, chatId, response, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getUserIdByLogin(data)];
                    case 1:
                        userId = _a.sent();
                        chatId = this.storeGet(storeMap.activeChatID);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4, chatsAPI.addUser({
                                users: [userId],
                                chatId: chatId,
                            })];
                    case 3:
                        response = _a.sent();
                        return [4, this.updateChatList()];
                    case 4:
                        _a.sent();
                        return [4, this.getUsers(chatId)];
                    case 5:
                        _a.sent();
                        this.storeSet(storeMap.chatPageProps + '.chatSelected', true);
                        return [2, response.response];
                    case 6:
                        e_8 = _a.sent();
                        this.statusHandler(e_8.status);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    ChatsController.prototype.removeUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, chatId, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._getUserIdByLogin(data)];
                    case 1:
                        userId = _a.sent();
                        chatId = this.storeGet(storeMap.activeChatID);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4, chatsAPI.deleteUser({ users: [userId], chatId: chatId })];
                    case 3:
                        _a.sent();
                        return [4, this.updateChatList()];
                    case 4:
                        _a.sent();
                        return [4, this.getUsers(chatId)];
                    case 5:
                        _a.sent();
                        this.storeSet(storeMap.chatPageProps + '.chatSelected', true);
                        return [3, 7];
                    case 6:
                        e_9 = _a.sent();
                        this.statusHandler(e_9.status);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    ChatsController.prototype.getUsers = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, props_1, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, chatsAPI.getUsers(chatId)];
                    case 1:
                        response = _a.sent();
                        props_1 = this.storeGet(storeMap.chatPageProps);
                        props_1.chatUsers = [];
                        response.response.map(function (user) {
                            if (user.avatar === null) {
                                user.avatar = SETTINGS.avatarDummy;
                            }
                            else {
                                user.avatar = "".concat(SETTINGS.baseURL, "/resources").concat(user.avatar);
                            }
                            props_1.chatUsers.push({
                                avatar: user.avatar,
                                login: user.login,
                            });
                        });
                        this.storeRewrite(storeMap.chatPageProps, props_1);
                        return [3, 3];
                    case 2:
                        e_10 = _a.sent();
                        this.statusHandler(e_10.status);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ChatsController.prototype._socketMessageHandler = function (event) {
        var _this = this;
        var userID = this.storeGet(storeMap.currentUserID);
        var messagesData = JSON.parse(event.data);
        if (messagesData.type === 'user connected') {
            return;
        }
        var props = this.storeGet(storeMap.chatPageProps);
        if (!Array.isArray(messagesData)) {
            messagesData = [messagesData];
        }
        messagesData.reduceRight(function (messageList, message) {
            var parsedMessage = _this._parseMessage(message, userID);
            messageList.unshift(parsedMessage);
            return messageList;
        }, props.feed);
        this.storeRewrite(storeMap.chatPageProps, props);
    };
    return ChatsController;
}(Controller));
var chatsController = new ChatsController();
export default chatsController;
