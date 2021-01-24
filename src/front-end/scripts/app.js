var app = app || {};

let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

const gameWidth = 1366;
const gameHeight = 768;

const appContainer = document.querySelector('.app-container');
const appStage = document.querySelector('.app-stage');

const appOptions = {
    width: gameWidth,
    height: gameHeight,
    antialias: true,
    transparent: true,
    resolution: 1,
};

let pixiApplication = new PIXI.Application(appOptions);

pixiApplication.renderer.autoResize = true;
appStage.appendChild(pixiApplication.view);

const appConfig = {
    sprites: {},
    sounds: {},
};

function draw() {
    Object.keys(appConfig.sprites).forEach(key => {
        appConfig.sprites[key].width = 50;
        appConfig.sprites[key].height = 40;
        pixiApplication.stage.addChild(appConfig.sprites[key]);
    });
}
sounds.whenLoaded = () => {
    appConfig.sounds["pew"] = sounds["sounds/pew.mp3"];
}

sounds.load(["sounds/pew.mp3"]);

PIXI.loader
    .add("images/giga-tank-blue.png")
    .add("images/laser-tank-blue.png")
    .add("images/basic-tank-blue.png")
    .add("images/giga-tank-red.png")
    .add("images/laser-tank-red.png")
    .add("images/basic-tank-red.png")
    .load(() => {
        appConfig.sprites["giga-tank-blue"] = new PIXI.Sprite(PIXI.loader.resources["images/giga-tank-blue.png"].texture);
        appConfig.sprites["laser-tank-blue"] = new PIXI.Sprite(PIXI.loader.resources["images/laser-tank-blue.png"].texture);
        appConfig.sprites["basic-tank-blue"] = new PIXI.Sprite(PIXI.loader.resources["images/basic-tank-blue.png"].texture);
        appConfig.sprites["giga-tank-red"] = new PIXI.Sprite(PIXI.loader.resources["images/giga-tank-red.png"].texture);
        appConfig.sprites["laser-tank-red"] = new PIXI.Sprite(PIXI.loader.resources["images/laser-tank-red.png"].texture);
        appConfig.sprites["basic-tank-red"] = new PIXI.Sprite(PIXI.loader.resources["images/basic-tank-red.png"].texture);

        draw();
    });

app.config = appConfig;
