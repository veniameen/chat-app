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
import ErrorBanner from '../../components/errorBanner/index.js';
import Component from '../../modules/Component.js';
import { storeMap } from '../../config.js';
import Router from '../../modules/Router.js';
var partials = [];
var router = new Router();
var ErrorPage = (function (_super) {
    __extends(ErrorPage, _super);
    function ErrorPage(props) {
        var _this = this;
        var errorBanner = new ErrorBanner({ type: 'Тип ошибки', description: 'Описание ошибки' }, storeMap.errorPageProps);
        partials.push({ name: 'errorBanner', component: errorBanner });
        _this = _super.call(this, props) || this;
        errorBanner.bindParent(_this);
        _this.element.addEventListener('click', function (e) { return _this.clickHandler(e); });
        return _this;
    }
    ErrorPage.prototype.compile = function (context) {
        partials.forEach(function (partial) {
            if (partial.component.element) {
                Handlebars.registerPartial(partial.name, partial.component.element.innerHTML);
            }
        });
        return Handlebars.compile(template)(context);
    };
    ErrorPage.prototype.clickHandler = function (event) {
        var target = event.target;
        if (target.classList.contains('link-back'))
            router.back();
    };
    return ErrorPage;
}(Component));
export { ErrorPage };
