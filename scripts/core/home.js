var app = app || {};

const supportedCommands = {
    '-play': {
        invoke: () => {},
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
            app.config.sounds.pew.play();
        },
        help: 'Does a pew!',
    }
};

class Home {
    constructor() {
        this.commands = supportedCommands;
    }

    isCommand(command) {
        return this.commands.hasOwnProperty(command);
    }

    dispatch(command) {
        this.commands[command].invoke();
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
                        app.socketService.send('SendMessage', app.userService.user, message);
                    }
                }
            }
        });
    }
}

app.Home = new Home();
