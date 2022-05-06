import EventBus from './EventBus.js';
var EVENTS;
(function (EVENTS) {
    EVENTS["OPENING"] = "1";
    EVENTS["OPENED"] = "2";
    EVENTS["CLOSING"] = "3";
    EVENTS["CLOSED"] = "4";
    EVENTS["CLOSED_CLEAN"] = "5";
    EVENTS["CLOSED_BREAK"] = "6";
    EVENTS["SENT"] = "7";
    EVENTS["RECEIVED"] = "8";
    EVENTS["ERROR"] = "9";
})(EVENTS || (EVENTS = {}));
var WebSocketTransport = (function () {
    function WebSocketTransport(baseUrl) {
        this._eventBus = new EventBus();
        this._baseUrl = baseUrl;
        this._optionalUrl = null;
        this._socket = null;
    }
    WebSocketTransport.prototype.open = function (optionalUrl) {
        if (optionalUrl === void 0) { optionalUrl = ''; }
        if (this._optionalUrl === optionalUrl) {
            return;
        }
        this.close();
        this._eventBus.emit(EVENTS.OPENING, optionalUrl);
        this._socket = new WebSocket("".concat(this._baseUrl).concat(optionalUrl));
        this._optionalUrl = optionalUrl;
        this._socket.onclose = function (e) {
            console.log('websocket disconnected:' + e.code + ' ' + e.reason + ' ' + e.wasClean);
        };
        this._socket.addEventListener('open', this._openEventHandler.bind(this));
        this._socket.addEventListener('close', this._closeEventHandler.bind(this));
        this._socket.addEventListener('message', this._messageEventHandler.bind(this));
        this._socket.addEventListener('error', this._errorEventHandler.bind(this));
    };
    WebSocketTransport.prototype.close = function () {
        if (this._socket === null) {
            return;
        }
        this._eventBus.emit(EVENTS.CLOSING);
        this._socket.removeEventListener('open', this._openEventHandler.bind(this));
        this._socket.removeEventListener('close', this._closeEventHandler.bind(this));
        this._socket.removeEventListener('message', this._messageEventHandler.bind(this));
        this._socket.removeEventListener('error', this._errorEventHandler.bind(this));
        this._socket.close();
        this._socket = null;
        this._optionalUrl = null;
    };
    WebSocketTransport.prototype.send = function (message) {
        if (message === void 0) { message = 'ping'; }
        if (this._socket === null) {
            throw new Error("".concat(this.constructor.name, ": Socket is closed or not opened yet."));
        }
        this._socket.send(message);
        this._eventBus.emit(EVENTS.SENT, message);
    };
    WebSocketTransport.prototype.subscribe = function (event, callback) {
        this._eventBus.subscribe(event, callback);
    };
    WebSocketTransport.prototype.unsubscribe = function (event, callback) {
        this._eventBus.unsubscribe(event, callback);
    };
    WebSocketTransport.prototype._openEventHandler = function (event) {
        this._eventBus.emit(EVENTS.OPENED, event);
    };
    WebSocketTransport.prototype._closeEventHandler = function (event) {
        this._eventBus.emit(EVENTS.CLOSED, event);
        if (event.wasClean) {
            this._eventBus.emit(EVENTS.CLOSED_CLEAN);
        }
        else {
            this._eventBus.emit(EVENTS.CLOSED_BREAK);
        }
    };
    WebSocketTransport.prototype._messageEventHandler = function (event) {
        this._eventBus.emit(EVENTS.RECEIVED, event);
    };
    WebSocketTransport.prototype._errorEventHandler = function (event) {
        this._eventBus.emit(EVENTS.ERROR, event);
    };
    WebSocketTransport.EVENTS = EVENTS;
    return WebSocketTransport;
}());
export default WebSocketTransport;
