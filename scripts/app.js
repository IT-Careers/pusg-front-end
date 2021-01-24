var app = app || {};

const handleRouting = () => {
    const path = window.location.hash.substr(window.location.hash.indexOf('#') + 1);

    switch (path) {
        case '/home':
            app.htmlService.getTemplate('home').then((template) => {
                const compliedTemplate = app.htmlService.createElement(template);

                app.htmlService.clearElement('#app');
                app.htmlService.attachElement(compliedTemplate, '#app');

                app.Game.init();
                app.Home.init();
            });

            break;
        case '/play':
            app.htmlService.getTemplate('game').then((template) => {
                const compliedTemplate = app.htmlService.createElement(template);

                app.htmlService.clearElement('#app');
                app.htmlService.attachElement(compliedTemplate, '#app');

                app.Game.init();
            });

            break;
    }
};

window.location.hash = '#/home';

// Routing

window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);
