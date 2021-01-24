const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44385/home")
    .build();

connection.withCredentials = false;

connection.on('ReceiveMessage', (user, message) => {
    console.log(user);
    console.log(message);
});

async function start() {
    try {
        await connection.start();
        console.log('blasdasldalsd');
    } catch (e) {
        console.log(e);
    }
}

start().then(() => {});

document.querySelector('#main-chat-input').addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        const message = e.target.value;

        e.target.value = "";

        connection.invoke('SendMessage', 'Prakash', message);
    }
});
