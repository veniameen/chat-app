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
import Component from '../../modules/Component.js';
import { storeMap } from '../../config.js';
import controller from './controller.js';
import { Routes } from '../../index.js';
import { template } from './template.js';
var ProfilePage = (function (_super) {
    __extends(ProfilePage, _super);
    function ProfilePage(props) {
        var _this = _super.call(this, props, storeMap.profilePageProps) || this;
        _this.element.addEventListener('click', function (e) { return _this.clickHandler(e); });
        return _this;
    }
    ProfilePage.prototype.beforeMount = function () {
        controller.updateUserInfo();
    };
    ProfilePage.prototype.compile = function (context) {
        return Handlebars.compile(template)(context);
    };
    ProfilePage.prototype.clickHandler = function (event) {
        var target = event.target;
        if (target.closest('.profile__backlink')) {
            controller.back();
        }
        else if (target.closest('.edit-profile-link')) {
            controller.go(Routes.profileData);
        }
        else if (target.closest('.edit-password-link')) {
            controller.go(Routes.profilePassword);
        }
        else if (target.closest('.logout-link')) {
            controller.logout();
        }
    };
    return ProfilePage;
}(Component));
export { ProfilePage };
;
