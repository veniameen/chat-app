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
import { template } from './template.js';
import Button from '../../components/button/index.js';
import FormValidator from '../../modules/Validator.js';
import Component from '../../modules/Component.js';
import controller from './controller.js';
import { Routes } from '../../index.js';
import { loginValidationRules as checks } from '../../config.js';
var validator = new FormValidator(checks);
validator.setDataHandler(controller.signIn.bind(controller));
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage(props) {
        var _this = this;
        var button = new Button({ caption: 'Авторизоваться', type: 'submit' });
        if (button.element) {
            Handlebars.registerPartial('button', button.element.innerHTML);
        }
        _this = _super.call(this, props) || this;
        _this.element.addEventListener('click', function (e) { return _this.clickHandler(e); });
        return _this;
    }
    LoginPage.prototype.beforeCompile = function () {
        validator.detach();
    };
    LoginPage.prototype.afterCompile = function () {
        if (this.element)
            validator.attach(this.element, '.auth-form');
    };
    LoginPage.prototype.afterMount = function () {
        controller.checkAuth();
    };
    LoginPage.prototype.compile = function (context) {
        return Handlebars.compile(template)(context);
    };
    LoginPage.prototype.clickHandler = function (event) {
        var target = event.target;
        if (target.classList.contains('register-link'))
            controller.go(Routes.signup);
    };
    return LoginPage;
}(Component));
export { LoginPage };
