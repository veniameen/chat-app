var Validator = (function () {
    function Validator(_rules) {
        this._rules = _rules;
        this._dataHandler = null;
    }
    Validator.prototype.attach = function (root, selector) {
        var form = root.querySelector(selector);
        if (!form) {
            throw new Error("".concat(this.constructor.name, ": Form '").concat(selector, "' not found"));
        }
        var inputs = form.querySelectorAll('input');
        if (inputs.length === 0) {
            throw new Error("".concat(this.constructor.name, ": Form '").concat(selector, "' has no input fields"));
        }
        this._form = form;
        this._inputs = inputs;
        this._bindListeners();
    };
    Validator.prototype.detach = function () {
        this._unbindListeners();
        this._form = null;
        this._inputs = null;
    };
    Validator.prototype.setDataHandler = function (callback) {
        this._dataHandler = callback;
    };
    Validator.prototype._handle = function () {
        var data = {};
        if (!(this._inputs && this._dataHandler))
            return;
        this._inputs.forEach(function (input) { return (data[input.name] = input.value); });
        this._dataHandler(data);
    };
    Validator.prototype._bindListeners = function () {
        var _this = this;
        if (!(this._inputs && this._form))
            return;
        Validator.inputEvents.forEach(function (event) {
            _this._inputs.forEach(function (input) { return input.addEventListener("".concat(event), _this._validate.bind(_this)); });
        });
        this._form.addEventListener('submit', this._submitHandler.bind(this));
    };
    Validator.prototype._unbindListeners = function () {
        var _this = this;
        if (!(this._inputs && this._form))
            return;
        Validator.inputEvents.forEach(function (event) {
            _this._inputs.forEach(function (input) { return input.removeEventListener("".concat(event), _this._validate.bind(_this)); });
        });
        this._form.removeEventListener('submit', this._submitHandler.bind(this));
    };
    Validator.prototype._validate = function (event) {
        var input = event.target;
        if (!this._rules.hasOwnProperty(input.name))
            return true;
        var errorField = null;
        if (input.parentNode) {
            errorField = input.parentNode.querySelector('.field__error');
        }
        var err = null;
        this._rules[input.name].forEach(function (rule) {
            var regExp = new RegExp(rule.exp);
            if (!regExp.test(input.value))
                err = rule.err;
        });
        if (err) {
            if (errorField) {
                errorField.textContent = err;
                errorField.classList.add('field__error--show');
            }
            return false;
        }
        if (errorField)
            errorField.classList.remove('field__error--show');
        return true;
    };
    Validator.prototype._submitHandler = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this._inputs)
            return;
        var isValid = true;
        this._inputs.forEach(function (input) {
            var pseudoEvent = { target: input };
            if (!_this._validate(pseudoEvent))
                isValid = false;
        });
        if (isValid)
            this._handle();
    };
    Validator.CHECKS = {
        LENGTH: function (min, max) {
            if (max === void 0) { max = ''; }
            return {
                exp: "^.{".concat(min, ",").concat(max, "}$"),
                err: !max ? "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 - ".concat(min, " \u0441\u0438\u043C\u0432\u043E\u043B\u0430") : "\u0414\u043B\u0438\u043D\u0430 \u0441\u0442\u0440\u043E\u043A\u0438 - \u043E\u0442 ".concat(min, " \u0434\u043E ").concat(max, " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"),
            };
        },
        ALPHABETIC: {
            exp: /^[A-Za-zА-Яа-яё-]*$/,
            err: 'Только буквы',
        },
        ALPHANUMERIC: {
            exp: /^[A-Za-zА-Яа-яё0-9_-]*$/,
            err: 'Недопустимые символы',
        },
        FIRSTLETTER: {
            exp: /^[A-ZА-Я]/,
            err: 'Первая буква должна быть заглавной',
        },
        REQUIRED: {
            exp: /^.{1,}$/,
            err: 'Не может быть пустым',
        },
        LOGIN: {
            exp: /[A-Za-z]+[0-9]*$/,
            err: 'Не может состоять только из цифр',
        },
        EMAIL: {
            exp: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            err: 'Недопустимый формат email',
        },
        PHONE: {
            exp: /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
            err: 'Недопустимый формат номера',
        },
        PASSWORD_STRENGTH: {
            exp: /(^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))/,
            err: 'Слишком простой пароль',
        },
    };
    Validator.inputEvents = ['blur', 'keydown', 'keyup'];
    return Validator;
}());
export default Validator;
