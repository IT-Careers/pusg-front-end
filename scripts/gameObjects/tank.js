var app = app || {};

const DIRECTION_STATE = {
    'up': {
        next: 'right',
        previous: 'left',
    },
    'right': {
        next: 'down',
        previous: 'up',
    },
    'down': {
        next: 'left',
        previous: 'right',
    },
    'left': {
        next: 'up',
        previous: 'down',
    },
};

class Tank extends BaseGameObject {
    constructor(color, type, sprite, size, position, direction) {
        super(null, sprite, size, position);
        this.color = color;
        this.type = type;
        this.direction = direction;
    }

    get x (){
        return this.container.x;
    }

    get y (){
        return this.container.y;
    }

    set x (value) {
        this.container.x = value;
    }

    set y (value) {
        this.container.y = value;
    }

    rotateLeft() {
        this.direction = DIRECTION_STATE[this.direction].previous;

        this.container.rotation -= 1.57079633;
    }

    rotateRight() {
        this.direction = DIRECTION_STATE[this.direction].next;

        this.container.rotation += 1.57079633;
    }
}
