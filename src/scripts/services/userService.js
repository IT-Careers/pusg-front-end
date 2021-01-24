var app = app || {};

class UserService {
    constructor() {
        this.user = null;
    }

    login() {
        if(!this.user) {
            const username = prompt('Please, enter a Username:');

            if (username) {
                app.socketService.send('Login', username);
                this.user = username;
            }
        }
    }

    isLoggedIn() {
        return this.user;
    }
}

app.userService = new UserService();
