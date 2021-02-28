var app = app || {};

const supportedCommands = {
    '-play': {
        invoke: () => {
            app.socketService.initGame().finally(() => {
                app.socketService.send('game', 'Login', app.userService.user);
            });
        },
        help: 'Initiate matchmaking to find an opponent and play the game.',
    },
    '-help': {
        invoke: () => {
            Object.keys(supportedCommands).forEach(key => {
                const message = `[${key}]: ${supportedCommands[key].help}`;
                const user = 'PUSG';

                const helpMessageNode = app.htmlService.createElement(app.htmlService
                    .getElementFromTemplate('message', {user, message}));

                app.htmlService.attachElement(helpMessageNode, '.history-messages');
            });
        },
        help: 'The currently invoked command - prints help for all commands.',
    },
    '-pew': {
        invoke: () => {
            app.Game.config.sounds.pew.play();
        },
        help: 'Does a pew!',
    }
};

class Home {
    constructor() {
        this.commands = supportedCommands;
        this.cachedMessages = [];
    }

    isCommand(command) {
        return this.commands.hasOwnProperty(command);
    }

    dispatch(command) {
        this.commands[command].invoke();
    }

    initEvents() {
        app.eventService.addEventHandler('LoggedIn', () => {
            app.htmlService.clearElement('.history-messages');
        });

        app.eventService.addEventHandler('OnLoggedIn', (users) => {
            users.forEach(user => {
                if(!app.htmlService.getElement(`#${user}`)) {
                    const userNode = app.htmlService
                        .getElementFromTemplate('user', {
                            user: user,
                        });

                    app.htmlService.attachElement(app.htmlService.createElement(userNode), '.participants');
                }
            });
        });

        app.eventService.addEventHandler('OnLoggedOut', (users) => {
            users.forEach(user => {
                app.htmlService.getElement(`#${user}`).remove();
            });
        });

        app.eventService.addEventHandler('OnReceiveMessage', ([user, message]) => {
            const messageNode = app.htmlService
                .getElementFromTemplate('message', {
                    user: user,
                    message: message
                });

            this.cachedMessages.push(messageNode);

            app.htmlService.attachElement(app.htmlService.createElement(messageNode)
                , '.history-messages');
        });
    }

    init() {
        app.htmlService.addEventHandler('#main-chat-input', 'keyup',  (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                const message = e.target.value;

                if(!app.userService.isLoggedIn()) {
                    app.userService.login();
                }

                if(app.userService.isLoggedIn() && message) {
                    e.target.value = "";

                    if(this.isCommand(message)) {
                        this.dispatch(message);
                    } else {
                        app.socketService.send('home', 'SendMessage', app.userService.user, message);
                    }
                }
            }
        });

        if(app.userService.isLoggedIn()) {
            app.htmlService.clearElement('.history-messages');
            this.cachedMessages.forEach(cachedMessage => {
                app.htmlService.attachElement(app.htmlService.createElement(cachedMessage)
                    , '.history-messages');
            });
        }

        this.initEvents();
    }
}

app.Home = new Home();
