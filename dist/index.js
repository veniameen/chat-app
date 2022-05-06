var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Router from './modules/Router.js';
import { LoginPage } from './views/login/index.js';
import { ChatSelectPage } from './views/chat-select/index.js';
import { ErrorPage } from './views/error/index.js';
import { ProfilePage } from './views/profile/index.js';
import { ProfileDataPage } from './views/change-profile/index.js';
import { ProfilePasswordPage } from './views/change-password/index.js';
import { SignupPage } from './views/signup/index.js';
import { data as loginContext } from './views/login/template.js';
import { data as signupContext } from './views/signup/template.js';
import { data as profileDataContext } from './views/change-profile/template.js';
import { data as profilePasswordContext } from './views/change-password/template.js';
import Store from './modules/Store.js';
import { storeMap } from './config.js';
var router = new Router('.app');
export var Routes;
(function (Routes) {
    Routes["login"] = "/login";
    Routes["chatSelect"] = "/messenger";
    Routes["error"] = "/error";
    Routes["profile"] = "/settings";
    Routes["profileData"] = "/change-settings";
    Routes["profilePassword"] = "/change-password";
    Routes["signup"] = "/signup";
})(Routes || (Routes = {}));
var App = function () { return __awaiter(void 0, void 0, void 0, function () {
    var badRouteHandler;
    return __generator(this, function (_a) {
        badRouteHandler = function () {
            new Store().set(storeMap.errorPageProps, { type: '404', description: 'Не туда попали' });
            router.go(Routes.error);
        };
        router
            .use(Routes.login, LoginPage, loginContext)
            .use(Routes.chatSelect, ChatSelectPage, {})
            .use(Routes.error, ErrorPage, {})
            .use(Routes.profile, ProfilePage, {})
            .use(Routes.profileData, ProfileDataPage, profileDataContext)
            .use(Routes.profilePassword, ProfilePasswordPage, profilePasswordContext)
            .use(Routes.signup, SignupPage, signupContext)
            .setDefaultRoute(Routes.login)
            .setBadRouteHandler(badRouteHandler)
            .start();
        return [2];
    });
}); };
App();
