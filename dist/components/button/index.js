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
import template from './template.js';
import Component from '../../modules/Component.js';
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        return _super.call(this, props) || this;
    }
    Button.prototype.compile = function (context) {
        return Handlebars.compile(template)(context);
    };
    return Button;
}(Component));
export default Button;
