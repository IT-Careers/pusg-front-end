var app = app || {};

const handleRouting = () => {
    const path = window.location.hash.substr(window.location.hash.indexOf('#') + 1);

    switch (path) {
        case '/home':
            app.htmlService.getTemplate('home').then((template) => {
                const compliedTemplate = app.htmlService.createElement(template);

                app.htmlService.attachElement(compliedTemplate, 'body');

                app.Home.init();
            });

            break;
        case '/play':
            app.htmlService.getTemplate('game').then((template) => {
                const compliedTemplate = app.htmlService.createElement(template);

                app.htmlService.attachElement(compliedTemplate, 'body');
            });

            break;
    }
};

window.location.hash = '#/home';

// Routing

window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);
