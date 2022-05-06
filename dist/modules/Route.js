var Route = (function () {
    function Route(path, constructor, props) {
        this._block = null;
        this._pathname = path;
        this._constructor = constructor;
        this._block = null;
        this._props = props;
    }
    Route.prototype.pathname = function () {
        return this._pathname;
    };
    Route.prototype.navigate = function (pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    };
    Route.prototype.leave = function () {
        if (this._block) {
            this._block.unmount();
        }
    };
    Route.prototype.match = function (pathname) {
        return pathname === this._pathname;
    };
    Route.prototype.render = function () {
        if (!this._block)
            this._block = new this._constructor(this._props);
        this.mount();
    };
    Route.prototype.mount = function () {
        var root = document.querySelector(this._props.rootQuery);
        if (!root) {
            throw new Error("".concat(this.constructor.name, ": selector \"").concat(this._props.rootQuery, "\" not found"));
        }
        this._block.mount(root);
    };
    return Route;
}());
export default Route;
