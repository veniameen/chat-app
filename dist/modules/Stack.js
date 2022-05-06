var Stack = (function () {
    function Stack() {
        this._size = 0;
        this._top = null;
    }
    Stack.prototype.push = function (value) {
        this._top = {
            value: value,
            prev: this._top,
        };
        this._size++;
        return this._size;
    };
    Stack.prototype.pop = function () {
        if (this._top === null)
            throw new Error('Stack is empty');
        var value = this._top.value;
        this._top = this._top.prev;
        this._size--;
        return (value);
    };
    Stack.prototype.peek = function () {
        if (this._top === null)
            throw new Error('Stack is empty');
        return (this._top.value);
    };
    Stack.prototype.isEmpty = function () {
        return (this._size === 0);
    };
    Stack.prototype.getSize = function () {
        return this._size;
    };
    Stack.prototype.clear = function () {
        this._top = null;
        this._size = 0;
    };
    return Stack;
}());
export default Stack;
