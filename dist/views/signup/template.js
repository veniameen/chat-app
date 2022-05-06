export var template = "\n    <div class='content grid grid-column--reverse grid-middle'>\n        <div class='box'>\n            <div class='box__content'>\n                <h2>\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</h2>\n                <form class='auth-form grid grid-column' action='/index.html'>\n                    <div class='auth-form__container'>\n                        {{#each fields}}\n                            <div class='auth-form__field'>\n                                <input class='auth-form__text-input' id={{name}} type={{type}} name={{name}} value={{value}} autocorrect='off' autocapitalize='off' value='' required>\n                                <label class='auth-form__label' for={{name}}>{{title}}</label>\n                                <span class='field__error'></span>\n                            </div>\n                        {{/each}}\n                    </div>\n                    <div class='auth-form__action'>\n                        {{> button}}\n                    </div>\n                    <div class='auth-form__callout'>\n                        <a class='link link-signup'>\u0412\u043E\u0439\u0442\u0438</a>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n";
export var data = {
    fields: {
        email: {
            name: 'email',
            type: 'email',
            title: 'Почта',
            value: 'test10000007@mail.ru',
        },
        login: {
            name: 'login',
            type: 'text',
            title: 'Логин',
            value: 'veniamin2',
        },
        first: {
            name: 'first_name',
            type: 'text',
            title: 'Имя',
            value: 'Вениамин',
        },
        second: {
            name: 'second_name',
            type: 'text',
            title: 'Фамилия',
            value: 'Ряднов',
        },
        phone: {
            name: 'phone',
            type: 'tel',
            title: 'Телефон',
            value: '88000000000',
        },
        password: {
            name: 'password',
            type: 'password',
            title: 'Пароль',
            value: 'War123123;',
        },
    },
};
