var app = app || {};

class Game {
    constructor() {
        this.isLoaded = false;
        this.playerColor = null;
        this.appStage = null;
        this.pixiApplication = null;
        this.isRunning = false;
        this.gameObjects = []; // TODO: Make into player container
        this.shells = new ShellContainer();
        this.config = {
            sprites: {},
            sounds: {},
            state: {},
        };
    }

    loadSounds(callback) {
        sounds.whenLoaded = () => {
            this.config.sounds["pew"] = sounds["sounds/pew.mp3"];
        };

        sounds.load(["sounds/pew.mp3"]);

        callback();
    }

    loadSprites(callback) {
        PIXI.loader
            .add("images/giga-tank-blue.png")
            .add("images/laser-tank-blue.png")
            .add("images/basic-tank-blue.png")
            .add("images/giga-tank-red.png")
            .add("images/laser-tank-red.png")
            .add("images/basic-tank-red.png")
            .add("images/shell.png")
            .load(() => {
                this.config.sprites["giga-tank-blue"] = new PIXI.Sprite(PIXI.loader.resources["images/giga-tank-blue.png"].texture);
                this.config.sprites["laser-tank-blue"] = new PIXI.Sprite(PIXI.loader.resources["images/laser-tank-blue.png"].texture);
                this.config.sprites["basic-tank-blue"] = new PIXI.Sprite(PIXI.loader.resources["images/basic-tank-blue.png"].texture);
                this.config.sprites["giga-tank-red"] = new PIXI.Sprite(PIXI.loader.resources["images/giga-tank-red.png"].texture);
                this.config.sprites["laser-tank-red"] = new PIXI.Sprite(PIXI.loader.resources["images/laser-tank-red.png"].texture);
                this.config.sprites["basic-tank-red"] = new PIXI.Sprite(PIXI.loader.resources["images/basic-tank-red.png"].texture);
                this.config.sprites["shell"] = () => new PIXI.Sprite(PIXI.loader.resources["images/shell.png"].texture);

                callback();
            });
    }

    getCurrentPlayerTank() {
        return this.gameObjects
            .filter(go => go instanceof Tank)
            .find(go => go.color === this.playerColor);
    }

    getOtherPlayerTank() {
        return this.gameObjects
            .filter(go => go instanceof Tank)
            .find(go => go.color !== this.playerColor);
    }

    dispatch(command) {
        const currentPlayerTank = this.getCurrentPlayerTank();
        let result = false;

        switch (command) {
            case "left": {
                result = true;
                break;
            }
            case "up": {
                result = true;
                break;
            }
            case "right": {
                result = true;
                break;
            }
            case "down": {
                result = true;
                break;
            }
            case "rotate-left": {
                currentPlayerTank.rotateLeft();
                result = true;
                break;
            }
            case "rotate-right": {
                currentPlayerTank.rotateRight();
                result = true;
                break;
            }
            case "pew": {
                this.config.sounds.pew.play();
                result = true;
                break;
            }
            default:
                alert('Invalid command!')
        }

        if (result) {
            app.socketService.send('game', 'Update', command);
        }

        return result;
    }

    updateShells() {
        this.shells.each(shell => {
            if (!this.config.state.shells?.some(stateShell => stateShell.id === shell.id)) {
                shell.isDestroyed = true;
            }
        });

        this.config.state.shells?.forEach(stateShell => {
            if (!this.shells.contains(stateShell.id)) {
                const shell = new TankShell(
                    stateShell.id,
                    this.config.sprites["shell"].call(),
                    {width: 25, height: 25},
                    {x: stateShell.x, y: stateShell.y},
                    stateShell.direction,
                );

                this.shells.add(shell);
            } else {
                const currentShell = this.shells.get(stateShell.id);
                currentShell.x = stateShell.x;
                currentShell.y = stateShell.y;
            }
        });

        this.shells.update();
    }

    updatePlayers() {
        const currentTank = this.getCurrentPlayerTank();
        const otherTank = this.getOtherPlayerTank();
        if(currentTank && otherTank && this.playerColor === 'blue') {
            currentTank.x = this.config.state.blue.x;
            currentTank.y = this.config.state.blue.y;
            otherTank.x = this.config.state.red.x;
            otherTank.y = this.config.state.red.y;
        } else if(currentTank && otherTank && this.playerColor === 'red') {
            currentTank.x = this.config.state.red.x;
            currentTank.y = this.config.state.red.y;
            otherTank.x = this.config.state.blue.x;
            otherTank.y = this.config.state.blue.y;
        }
    }

    update() {
        app.socketService.send('game', 'GetState');

        this.updateShells();
        this.updatePlayers();

        this.gameObjects.forEach(gameObject => gameObject.update());
    }

    draw() {
        this.gameObjects.forEach(gameObject => this.pixiApplication.stage.addChild(gameObject.draw()));
        this.shells.each(shell => this.pixiApplication.stage.addChild(shell.draw()));
    }

    initGameObjects() {
        const bluePlayer = new Tank(
            'blue',
            'basic',
            this.config.sprites['basic-tank-blue'],
            {
                width: 50,
                height: 40
            },
            {
                x: 50,
                y: 384
            },
            'right');

        const redPlayer = new Tank(
            'red',
            'basic',
            this.config.sprites['basic-tank-red'],
            {
                width: 50,
                height: 40
            },
            {
                x: 1266,
                y: 384
            },
            'left');

        this.gameObjects.push(bluePlayer);
        this.gameObjects.push(redPlayer);
    };

    initEvents() {
        app.eventService.addEventHandler('OtherUp', () => {
            this.getOtherPlayerTank().moveUp();
        });

        app.eventService.addEventHandler('OtherRight', () => {
            this.getOtherPlayerTank().moveRight();
        });

        app.eventService.addEventHandler('OtherDown', () => {
            this.getOtherPlayerTank().moveDown();
        });

        app.eventService.addEventHandler('OtherLeft', () => {
            this.getOtherPlayerTank().moveLeft();
        });

        app.eventService.addEventHandler('OtherRotateLeft', () => {
            this.getOtherPlayerTank().rotateLeft();
        });

        app.eventService.addEventHandler('OtherRotateRight', () => {
            this.getOtherPlayerTank().rotateRight();
        });

        app.eventService.addEventHandler('GameState', (state) => {
            this.config.state = state;
        });
    }

    gameLoop() {
        if (this.isRunning) {
            setTimeout(() => {
            }, 17);
            requestAnimationFrame(() => this.update());
            requestAnimationFrame(() => this.draw());
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    loadResources(callback) {
        if (!this.isLoaded) {
            this.isLoaded = true;
            this.loadSounds(() => {
            });
            this.loadSprites(callback);
        } else {
            callback();
        }
    }

    init() {
        let type = "WebGL";

        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas";
        }

        const appOptions = {
            width: 1366,
            height: 768,
            antialias: true,
            transparent: true,
            resolution: 1,
        };

        this.pixiApplication = new PIXI.Application(appOptions);
        this.pixiApplication.renderer.autoResize = true;

        this.loadResources(() => {
            this.initGameObjects();
            this.draw();
        });

        this.initEvents();
        this.isRunning = true;
        this.gameLoop();
    }

    reset() {
        this.appStage.innerHTML = '';
        this.playerColor = null;
        this.appStage = null;
        this.pixiApplication = null;
        this.isRunning = false;
        this.gameObjects = []; // TODO: Make into player container
        this.shells = new ShellContainer();
        this.config.state = {};
    }

    // -> move to init
    load(playerColor) {
        this.playerColor = playerColor;
        this.appStage = app.htmlService.getElement('.app-stage');
        this.appStage.appendChild(this.pixiApplication.view);

        app.htmlService.addEventHandler('#chat', 'keyup', (e) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                const command = e.target.value;

                if (this.dispatch(command)) {
                    e.target.value = "";
                }
            }
        });
    }
}

app.Game = new Game();
