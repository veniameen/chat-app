export var template = "\n    <div class=\"content grid grid-column--reverse grid-middle\">\n        <div class=\"box\">\n            <div class=\"box__content\">\n                <h2>\u0412\u0445\u043E\u0434</h2>\n                <form class=\"auth-form grid grid-column\" action=\"/index.html\">\n                    <div class=\"auth-form__container\">\n                        {{#each fields}}\n                            <div class=\"auth-form__field\">\n                                <input class=\"auth-form__text-input\" id={{name}} type={{type}} name={{name}} tabindex={{index}} autocorrect=\"off\" autocapitalize=\"off\" value=\"War123123;\"required>\n                                <label class=\"auth-form__label\" for={{name}}>{{title}}</label>\n                                <span class=\"field__error\"></span>\n                            </div>\n                        {{/each}}\n                    </div>\n                    <div class=\"auth-form__action\">\n                        {{> button}}\n                    </div>\n                    <div class=\"auth-form__callout\">\n                        <a class=\"link link-register\">\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?</a>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n";
export var data = {
    fields: {
        login: {
            name: 'login',
            type: 'text',
            title: 'Логин',
            index: 1,
        },
        password: {
            name: 'password',
            type: 'password',
            title: 'Пароль',
            index: 2,
        },
    },
};
