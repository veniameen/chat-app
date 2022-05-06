export var page = {
    render: function (html, data) {
        var app = document.querySelector('.app');
        if (app) {
            app.innerHTML = Handlebars.compile(html)(data);
        }
    },
};
