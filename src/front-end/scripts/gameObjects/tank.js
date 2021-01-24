var app = app || {};

class Tank {
    constructor(color, type, sprite, position, direction) {
        this.color = color;
        this.type = type;
        this.sprite = sprite;
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.direction = direction;
    }

    update() { }

    draw() {
        app.pixiApplication.stage.addChild(this.sprite);
    }
}
