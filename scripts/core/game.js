var app = app || {};

class Game {
    constructor() {
        this.appStage = null;
        this.pixiApplication = null;
        this.gameObjects = [];
        this.config = {
            sprites: {},
            sounds: {},
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
                this.config.sprites["shell"] = new PIXI.Sprite(PIXI.loader.resources["images/shell.png"].texture);

                // Giga Tank
                this.config.sprites["giga-tank-blue"].width = 100;
                this.config.sprites["giga-tank-blue"].height = 80;
                this.config.sprites["giga-tank-red"].width = 100;
                this.config.sprites["giga-tank-red"].height = 80;

                // Laser Tank
                this.config.sprites["laser-tank-blue"].width = 75;
                this.config.sprites["laser-tank-blue"].height = 60;
                this.config.sprites["laser-tank-red"].width = 75;
                this.config.sprites["laser-tank-red"].height = 60;

                // Basic Tank
                this.config.sprites["basic-tank-blue"].width = 50;
                this.config.sprites["basic-tank-blue"].height = 40;
                this.config.sprites["basic-tank-red"].width = 50;
                this.config.sprites["basic-tank-red"].height = 40;

                // Shells
                this.config.sprites["shell"].width = 25;
                this.config.sprites["shell"].height = 25;

                callback();
            });
    }

    update() {
        this.gameObjects.forEach(gameObject => gameObject.update());
    }

    draw() {
        this.gameObjects.forEach(gameObject => gameObject.draw());
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
        this.appStage = app.htmlService.getElement('.app-stage');
        this.appStage.appendChild(this.pixiApplication.view);

        this.loadSounds();
        this.loadSprites(this.draw);

        this.pixiApplication.ticker.add((delta) => {
            update();
        });
    }
}

app.Game = new Game();
