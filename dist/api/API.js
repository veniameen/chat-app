import { HTTPTransport } from '../modules/Service.js';
import { SETTINGS } from '../config.js';
var transport = new HTTPTransport(SETTINGS.baseURL);
var API = (function () {
    function API() {
        var _this = this;
        this.transportErrorHandler = function (e) {
            throw new Error("".concat(_this.constructor.name, ": Transport error (").concat(e, ")"));
        };
        this.get = function (url, options) {
            try {
                return transport.get(url, options);
            }
            catch (e) {
                _this.transportErrorHandler(e);
            }
        };
        this.post = function (url, options) {
            try {
                return transport.post(url, options);
            }
            catch (e) {
                _this.transportErrorHandler(e);
            }
        };
        this.put = function (url, options) {
            try {
                return transport.put(url, options);
            }
            catch (e) {
                _this.transportErrorHandler(e);
            }
        };
        this.delete = function (url, options) {
            try {
                return transport.delete(url, options);
            }
            catch (e) {
                _this.transportErrorHandler(e);
            }
        };
        return;
    }
    return API;
}());
export { API };
