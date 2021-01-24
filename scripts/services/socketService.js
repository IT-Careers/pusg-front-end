var app = app || {};

class SocketService {
    constructor() {
        this.connection = null;
        this.init();
    }

    async initConnection() {
        this.connection = await new signalR.HubConnectionBuilder()
            .withUrl("https://pusg-api.herokuapp.com/home")
            .build();
    }

    initReceivers() {
        this.connection.on('OnConnected', ([message]) => {
            console.log(message);
        });

        this.connection.on('ReceiveMessage', ([user, message]) => {
            const messageNode = app.htmlService
                .getElementFromTemplate('message', {
                    user: user,
                    message: message
                });

            app.htmlService.attachElement(app.htmlService.createElement(messageNode)
                , '.history-messages');
        });
    }

    init() {
        this.initConnection().then(() => {
            this.initReceivers();
            this.start();
        });
    }

    start() {
        const starting = async () => {
            try {
                await this.connection.start();
            } catch (e) {
                console.log(e);
            }
        };

        starting().then(() => {});
    }

    send(method, ...args) {
        this.connection.invoke(method, ...args);
    }
}

app.socketService = new SocketService();




