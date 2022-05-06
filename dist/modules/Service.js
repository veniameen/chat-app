var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var METHODS;
(function (METHODS) {
    METHODS["GET"] = "GET";
    METHODS["POST"] = "POST";
    METHODS["PUT"] = "PUT";
    METHODS["DELETE"] = "DELETE";
})(METHODS || (METHODS = {}));
function queryStringify(data) {
    return Object.entries(data).reduce(function (res, _a) {
        var key = _a[0], value = _a[1];
        return "".concat(res).concat(key, "=").concat(value, "&");
    }, '?');
}
var HTTPTransport = (function () {
    function HTTPTransport(_baseURL) {
        var _this = this;
        this._baseURL = _baseURL;
        this.get = function (url, options) {
            if (options === void 0) { options = {}; }
            if (options.data)
                url += queryStringify(options.data);
            var b = _this.request(url, __assign(__assign({}, options), { method: METHODS.GET }), options.timeout);
            console.log(b);
            return b;
        };
        this.post = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(url, __assign(__assign({}, options), { method: METHODS.POST }), options.timeout);
        };
        this.put = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(url, __assign(__assign({}, options), { method: METHODS.PUT }), options.timeout);
        };
        this.delete = function (url, options) {
            if (options === void 0) { options = {}; }
            return _this.request(url, __assign(__assign({}, options), { method: METHODS.DELETE }), options.timeout);
        };
        this.request = function (url, options, timeout) {
            if (timeout === void 0) { timeout = 5000; }
            var _a = options.headers, headers = _a === void 0 ? {} : _a, method = options.method, data = options.data;
            url = "".concat(_this._baseURL).concat(url);
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.onload = function () {
                    if (xhr.status < 400) {
                        resolve(xhr);
                    }
                    else {
                        reject(xhr);
                    }
                };
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                xhr.timeout = timeout;
                xhr.withCredentials = true;
                xhr.responseType = 'json';
                var headersEntries = Object.entries(headers);
                if (headersEntries.length)
                    headersEntries.forEach(function (header) { return xhr.setRequestHeader(header[0], header[1]); });
                else
                    xhr.setRequestHeader('Content-Type', 'application/json');
                if (method === METHODS.GET || !data)
                    xhr.send();
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
    }
    return HTTPTransport;
}());
export { HTTPTransport };
