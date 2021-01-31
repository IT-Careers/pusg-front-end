var app = app || {};

class BaseGameObject {
    constructor(id, sprite, size, position) {
        this.id = id;
        this.sprite = sprite;
        this.container = new PIXI.Container();
        this.sprite.width = size.width;
        this.sprite.height = size.height;
        this.container.width = size.width;
        this.container.height = size.height;
        this.container.x = position.x;
        this.container.y = position.y;
        this.container.addChild(this.sprite);
        this.container.pivot.x = this.container.width / 2;
        this.container.pivot.y = this.container.height / 2;
    }

    update() {}

    draw() {
        return this.container;
    }

    destroy() {
        this.container.parent.removeChild(this.container);
        this.container.destroy({children: false, texture: false, baseTexture: false});
    }
}
