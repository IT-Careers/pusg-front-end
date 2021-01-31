var app = app || {};

const gameEvents = (() => {
    app.eventService.addEventHandler('GameEnd', (result) => {
        if(result) {
            const message = result.result;
            const user = 'PUSG';

            app.socketService.send('home', 'SendMessage', user, message);
        }

        app.Game.reset();
        app.socketService.disconnectGame();
        window.location.hash = '#/home';
    });
})();

const handleRouting = () => {
    const path = window.location.hash.substr(window.location.hash.indexOf('#') + 1);

    switch (path) {
        case '/home':
            app.htmlService.getTemplate('home').then((template) => {
                const compliedTemplate = app.htmlService.createElement(template);

                app.htmlService.clearElement('#app');
                app.htmlService.attachElement(compliedTemplate, '#app');

                app.socketService.initHome();
                app.Home.init();
            });

            break;
        case '/play':
            app.htmlService.getTemplate('game').then((template) => {
                const compliedTemplate = app.htmlService.createElement(template);

                app.htmlService.clearElement('#app');
                app.htmlService.attachElement(compliedTemplate, '#app');

                app.Game.init();
                app.Game.load(app.config.USER.COLOR);
            });

            break;
    }
};

window.location.hash = '#/home';

// Routing

window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);
