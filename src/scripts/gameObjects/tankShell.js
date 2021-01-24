var app = app || {};

class TankShell {
    constructor(sprite, position, direction) {
        this.sprite = sprite;
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.direction = direction;
    }

    update() {
        switch(this.direction) {
            case "up":
                this.sprite.y--;
                break;
            case "right":
                this.sprite.x++;
                break;
            case "down":
                this.sprite.y++;
                break;
            case "left":
                this.sprite.x--;
                break;
        }
    }

    draw() {
        app.pixiApplication.stage.addChild(this.sprite);
    }
}
