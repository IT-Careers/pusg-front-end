var app = app || {};

class UserService {
    constructor() {
        this.user = null;
    }

    login() {
        if(!this.user) {
            const username = prompt('Please, enter a Username:');

            if (username) {
                app.socketService.send('home', 'Login', username);
                this.user = username;
                app.eventService.triggerEvent('LoggedIn');
            }
        }
    }

    refreshLogin() {
        if(this.user) {
            app.socketService.send('home', 'Login', this.user);
            app.eventService.triggerEvent('LoggedIn');
        }
    }

    isLoggedIn() {
        return this.user;
    }
}

app.userService = new UserService();
