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
import { profileValidationRules as checks } from '../../config.js';
var validator = new FormValidator(checks);
validator.setDataHandler(controller.signUp.bind(controller));
var SignupPage = (function (_super) {
    __extends(SignupPage, _super);
    function SignupPage(props) {
        var _this = this;
        var button = new Button({
            caption: 'Зарегистрироваться',
            type: 'submit',
        });
        if (button.element) {
            Handlebars.registerPartial('button', button.element.innerHTML);
        }
        _this = _super.call(this, props) || this;
        _this.element.addEventListener('click', function (e) { return _this.clickHandler(e); });
        return _this;
    }
    SignupPage.prototype.compiled = function () {
        if (this.element)
            validator.attach(this.element, '.auth-form');
    };
    SignupPage.prototype.componentDidUpdate = function () {
        validator.detach();
    };
    SignupPage.prototype.compile = function (context) {
        return Handlebars.compile(template)(context);
    };
    SignupPage.prototype.clickHandler = function (event) {
        var target = event.target;
        if (target.classList.contains('link-signup'))
            controller.go(Routes.login);
    };
    return SignupPage;
}(Component));
export { SignupPage };
