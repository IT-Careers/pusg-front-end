var app = app || {};

class TankShell extends BaseGameObject {
    constructor(id, sprite, size, position, direction) {
        super(id, sprite, size, position);
        this.direction = direction;
        this.isDestroyed = false;
    }

    set x (value) {
        this.container.x = value;
    }

    set y (value) {
        this.container.y = value;
    }

    update() {}
}
