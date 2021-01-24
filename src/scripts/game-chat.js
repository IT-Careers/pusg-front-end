var app = app || {};

function dispatch(command) {
    switch(command) {
        case "left": {
            app.config.sprites['basic-tank-blue'].x -= 20;
            return true;
        }
        case "up": {
            app.config.sprites['basic-tank-blue'].y -= 20;
            return true;
        }
        case "right": {
            app.config.sprites['basic-tank-blue'].x += 20;
            return true;
        }
        case "down": {
            app.config.sprites['basic-tank-blue'].y += 20;
            return true;
        }
        case "rotate-left": {
            app.config.sprites['basic-tank-blue'].rotation -= 0.5;
            app.config.sprites['basic-tank-blue'].rotation -= 0.5;
            return true;
        }
        case "rotate-right": {
            app.config.sprites['basic-tank-blue'].rotation += 0.75;
            app.config.sprites['basic-tank-blue'].rotation += 0.75;
            return true;
        }
        case "pew": {
            app.config.sounds.pew.play();
            return true;
        }
        default: alert('Invalid command!')
    }

    return false;
}

htmlService.addEventHandler('#chat', 'keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        const command = e.target.value;

        if(dispatch(command)) {
            e.target.value = "";
        }
    }
});
