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
import { template } from './template.js';
import Component from '../../modules/Component.js';
import { chatNameValidationRules, loginValidationRules, storeMap, chatIDValidationRules } from '../../config.js';
import controller from './controller.js';
import { Routes } from '../../index.js';
import Button from '../../components/button/index.js';
import Validator from '../../modules/Validator.js';
import xssEscape from '../../utils/xssEscape.js';
var newChatValidator = new Validator(chatNameValidationRules);
var addUserValidator = new Validator(loginValidationRules);
var removeUserValidator = new Validator(loginValidationRules);
var removeChatValidator = new Validator(chatIDValidationRules);
newChatValidator.setDataHandler(controller.createChat.bind(controller));
addUserValidator.setDataHandler(controller.addUser.bind(controller));
removeUserValidator.setDataHandler(controller.removeUser.bind(controller));
removeChatValidator.setDataHandler(controller.deleteChat.bind(controller));
var ChatSelectPage = (function (_super) {
    __extends(ChatSelectPage, _super);
    function ChatSelectPage(props) {
        var _this = this;
        var addChatButton = new Button({ caption: 'Создать чат', type: 'submit', classList: ['add-chat-button'] });
        var submitNewChatButton = new Button({ caption: 'Создать', type: 'submit', classList: ['submit-chat-button'] });
        var addUserButton = new Button({ caption: 'Добавить', type: 'submit' });
        var removeUserButton = new Button({ caption: 'Удалить', type: 'submit' });
        var removeChatButton = new Button({ caption: 'Удалить', type: 'submit', classList: ['btn-mb', 'remove-chat-link'] });
        var closeChatModalButton = new Button({ caption: 'Отмена', type: 'submit', classList: ['btn-default', 'remove-chat-close'] });
        if (addChatButton.element) {
            Handlebars.registerPartial('addChatButton', addChatButton.element.innerHTML);
        }
        if (submitNewChatButton.element) {
            Handlebars.registerPartial('submitNewChatButton', submitNewChatButton.element.innerHTML);
        }
        if (addUserButton.element) {
            Handlebars.registerPartial('addUserButton', addUserButton.element.innerHTML);
        }
        if (removeUserButton.element) {
            Handlebars.registerPartial('removeUserButton', removeUserButton.element.innerHTML);
        }
        if (removeChatButton.element) {
            Handlebars.registerPartial('removeChatButton', removeChatButton.element.innerHTML);
        }
        if (closeChatModalButton.element) {
            Handlebars.registerPartial('closeChatModalButton', closeChatModalButton.element.innerHTML);
        }
        Handlebars.registerHelper('activeChat', function (value) {
            var activeChatID = controller.storeGet(storeMap.activeChatID);
            return value === activeChatID;
        });
        _this = _super.call(this, props, storeMap.chatPageProps) || this;
        _this.element.addEventListener('click', function (e) { return _this.clickHandler(e); });
        return _this;
    }
    ChatSelectPage.prototype.beforeCompile = function () {
        newChatValidator.detach();
        addUserValidator.detach();
        removeUserValidator.detach();
        removeChatValidator.detach();
    };
    ChatSelectPage.prototype.beforeMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, controller.pageMountHandler()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ChatSelectPage.prototype.compile = function (context) {
        return Handlebars.compile(template)(context);
    };
    ChatSelectPage.prototype.afterCompile = function () {
        if (this.element) {
            newChatValidator.attach(this.element, '.new-chat-form');
            addUserValidator.attach(this.element, '.add-user-form');
            removeUserValidator.attach(this.element, '.remove-user-form');
            removeChatValidator.attach(this.element, '.remove-chat-form');
        }
    };
    ChatSelectPage.prototype.afterUnmount = function () {
        controller.pageUnmountHandler();
    };
    ChatSelectPage.prototype.clickHandler = function (event) {
        var target = event.target;
        var chatListItem = target.closest('.user');
        if (chatListItem) {
            this.chatSelectHandler(chatListItem);
            return;
        }
        ;
        if (target.closest('.go-profile-link')) {
            controller.go(Routes.profile);
            return;
        }
        ;
        if (target.closest('.add-chat-button')) {
            this._showModal('.new-chat-modal');
            return;
        }
        if (target.classList.contains('modal')) {
            this._hideCurrentModal(target);
            return;
        }
        if (target.classList.contains('add-user-link')) {
            this._hideModal('.modal');
            this._showModal('.add-user-modal');
            return;
        }
        if (target.classList.contains('remove-user-link')) {
            this._hideModal('.modal');
            this._showModal('.remove-user-modal');
            return;
        }
        if (target.classList.contains('remove-chat-modal-link')) {
            var getIdChat = controller.storeGet(storeMap.activeChatID);
            var setModalInput = this.element.querySelector('.remove-chat-modal input');
            if (setModalInput)
                setModalInput.value = getIdChat;
            this._hideModal('.modal');
            this._showModal('.remove-chat-modal');
        }
        if (target.classList.contains('remove-chat-close')) {
            event.preventDefault();
            this._hideModal('.modal');
        }
        if (target.classList.contains('chat__user-option')) {
            var chatMenu = this.element.querySelector('.chat__user-option-dropdown');
            if (chatMenu)
                chatMenu.classList.toggle('chat__user-option-dropdown-active');
        }
        if (target.classList.contains('chat__media')) {
            var chatMedia = this.element.querySelector('.chat__media-dropdown');
            if (chatMedia)
                chatMedia.classList.toggle('chat__media-dropdown-active');
        }
        if (target.classList.contains('chat__send')) {
            event.preventDefault();
            this._sendMessage();
        }
        if (!target.classList.contains('dropdown__list') && !target.classList.contains('chat__media') && !target.classList.contains('chat__user-option')) {
            var dropdown = this.element.querySelector('.chat__user-option-dropdown');
            var chatMedia = this.element.querySelector('.chat__media-dropdown');
            if (chatMedia)
                chatMedia.classList.remove('chat__media-dropdown-active');
            if (dropdown)
                dropdown.classList.remove('chat__user-option-dropdown-active');
        }
    };
    ChatSelectPage.prototype.chatSelectHandler = function (chatListItem) {
        return __awaiter(this, void 0, void 0, function () {
            var chatID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (chatListItem.classList.contains('user__active'))
                            return [2];
                        chatID = chatListItem.dataset.id;
                        if (!chatID) {
                            throw new Error("".concat(this.constructor.name, ": Chat-list item chatID not defined"));
                        }
                        return [4, controller.chatSelectHandler(parseInt(chatID))];
                    case 1:
                        _a.sent();
                        return [4, controller.getUsers(parseInt(chatID))];
                    case 2:
                        _a.sent();
                        controller.storeSet(storeMap.chatPageProps + '.chatSelected', true);
                        return [2];
                }
            });
        });
    };
    ChatSelectPage.prototype._hideCurrentModal = function (target) {
        target.classList.remove('modal_active');
    };
    ChatSelectPage.prototype._showModal = function (selector) {
        var modal = this.element.querySelector(selector);
        if (modal)
            modal.classList.add('modal_active');
    };
    ChatSelectPage.prototype._hideModal = function (selector) {
        var modal = this.element.querySelectorAll(selector);
        if (modal) {
            modal.forEach(function (item) { return item.classList.remove('modal_active'); });
        }
    };
    ChatSelectPage.prototype._sendMessage = function () {
        var messageInput = this.element.querySelector('.chat__text-input');
        var message = messageInput === null || messageInput === void 0 ? void 0 : messageInput.value;
        if (!message || message === '') {
            return;
        }
        messageInput.value = '';
        controller.sendMessage(xssEscape(message));
    };
    return ChatSelectPage;
}(Component));
export { ChatSelectPage };
