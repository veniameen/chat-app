var EventBus = (function () {
    function EventBus() {
        this._listeners = {};
        this._debugMode = false;
        this._strictMode = false;
        this._listeners = {};
        this.logger('New EventBus instance created');
    }
    EventBus.prototype.subscribe = function (event, callback) {
        if (!this._listeners[event])
            this._listeners[event] = [];
        this._listeners[event].push(callback);
        this.logger("Event subscription (".concat(event, ")"));
    };
    EventBus.prototype.unsubscribe = function (event, callback) {
        this.checkEventExistence(event);
        this._listeners[event] = this._listeners[event].filter(function (listener) { return listener !== callback; });
        this.logger("Event unsubscription (".concat(event, ")"));
    };
    EventBus.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logger("Event emitting initiated (".concat(event, ")"));
        if (!this.checkEventExistence(event))
            return;
        this._listeners[event].forEach(function (listener) { return listener.apply(void 0, args); });
    };
    EventBus.prototype.debugOn = function () {
        this._debugMode = true;
    };
    EventBus.prototype.debugOff = function () {
        this._debugMode = false;
    };
    EventBus.prototype.logger = function (msg) {
        if (this._debugMode)
            console.log("".concat(this.constructor.name, ": ").concat(msg));
    };
    EventBus.prototype.checkEventExistence = function (event) {
        if (!this._listeners[event]) {
            if (this._strictMode)
                throw new Error("Event listeners not found: ".concat(event));
            else
                return false;
        }
        return true;
    };
    return EventBus;
}());
export default EventBus;
