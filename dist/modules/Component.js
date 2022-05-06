import EventBus from './EventBus.js';
import Store from './Store.js';
var store = new Store();
var Component = (function () {
    function Component(props, storePath, tagName) {
        var _this = this;
        if (props === void 0) { props = {}; }
        if (storePath === void 0) { storePath = null; }
        if (tagName === void 0) { tagName = 'div'; }
        this._parentNode = null;
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            Object.assign(_this._props, nextProps);
        };
        this._meta = { tagName: tagName, props: props, storePath: storePath };
        this._props = this._makePropsProxy(props);
        this.eventBus = new EventBus();
        this._registerEvents();
        this.eventBus.emit(Component.EVENTS.CONSTRUCTED);
    }
    Component.prototype._registerEvents = function () {
        this.eventBus.subscribe(Component.EVENTS.CONSTRUCTED, this._init.bind(this));
        this.eventBus.subscribe(Component.EVENTS.INITIALISED, this._compile.bind(this, true));
        this.eventBus.subscribe(Component.EVENTS.UPDATED, this._compile.bind(this));
    };
    Component.prototype._init = function () {
        var _this = this;
        this._element = document.createElement(this._meta.tagName);
        if (this._meta.props.hasOwnProperty('classList')) {
            this._meta.props.classList.forEach(function (className) { return _this._element.classList.add(className); });
        }
        this._element.setAttribute('style', 'all: inherit');
        if (this._meta.storePath) {
            store.subscribe(this._meta.storePath, function () { return _this.eventBus.emit(Component.EVENTS.UPDATED); });
        }
        this.eventBus.emit(Component.EVENTS.INITIALISED);
    };
    Component.prototype._compile = function (force) {
        if (force === void 0) { force = false; }
        force;
        this.beforeCompile();
        if (this._meta.storePath) {
            this._meta.props = store.get(this._meta.storePath) || this._meta.props;
        }
        var block = this.compile(this._meta.props);
        if (this._element) {
            this._element.innerHTML = block;
        }
        this.afterCompile();
        this.eventBus.emit(Component.EVENTS.COMPILED);
    };
    Component.prototype.compile = function (context) {
        console.log(context);
        throw new Error("".concat(this.constructor.name, ": Method 'compile' must be redefined"));
    };
    Component.prototype.mount = function (parentNode) {
        this.beforeMount();
        if (this._parentNode)
            throw new Error("".concat(this.constructor.name, ": Component is already mounted"));
        parentNode.appendChild(this._element);
        this._parentNode = parentNode;
        this.afterMount();
        this.eventBus.emit(Component.EVENTS.MOUNTED);
    };
    Component.prototype.unmount = function () {
        if (!this._parentNode)
            return;
        this.beforeUnmount();
        this._parentNode.removeChild(this._element);
        this._parentNode = null;
        this.afterUnmount();
        this.eventBus.emit(Component.EVENTS.UNMOUNTED);
    };
    Component.prototype.bindParent = function (parent) {
        if (this._meta.storePath)
            store.subscribe(this._meta.storePath, function () { return parent.eventBus.emit(Component.EVENTS.UPDATED); });
    };
    Object.defineProperty(Component.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.show = function () {
        var element = this.element;
        if (element)
            element.style.display = 'block';
    };
    Component.prototype.hide = function () {
        var element = this.element;
        if (element)
            element.style.display = 'none';
    };
    Component.prototype.beforeCompile = function () { };
    Component.prototype.afterCompile = function () { };
    Component.prototype.beforeMount = function () { };
    Component.prototype.afterMount = function () { };
    Component.prototype.beforeUnmount = function () { };
    Component.prototype.afterUnmount = function () { };
    Component.prototype._makePropsProxy = function (props) {
        var self = this;
        return new Proxy(props, {
            set: function (target, prop, val) {
                target[prop] = val;
                self.eventBus.emit(Component.EVENTS.UPDATED);
                return true;
            },
            deleteProperty: function () {
                throw new Error("".concat(this.constructor.name, ": Proxy. Component property deletion is prohibited"));
            },
        });
    };
    Component.EVENTS = {
        CONSTRUCTED: 'construction-done',
        INITIALISED: 'flow:component-did-init',
        UPDATED: 'flow:component-did-update',
        COMPILED: 'flow:component-did-compile',
        MOUNTED: 'status:component-did-mount',
        UNMOUNTED: 'status:component-did-unmount',
    };
    return Component;
}());
export default Component;
