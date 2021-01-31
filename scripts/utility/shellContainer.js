var app = app || {};

class ShellContainer {
    constructor() {
        this.shells = [];
    }

    add(shell) {
        this.shells.push(shell);
    }

    remove(id) {
        this.shells.remove(this.shells.find(shell => shell.id === id));
    }

    contains(id) {
        return !!this.shells.find(shell => shell.id === id);
    }

    get(id) {
        return this.shells.find(shell => shell.id === id);
    }

    each(action) {
        this.shells.forEach(shell => action(shell));
    }

    find(predicate) {
        return this.shells.find(predicate);
    }

    update() {
        this.each(shell => {
            if(shell.isDestroyed) {
                shell.destroy();
            }
        });
        this.shells = this.shells.filter(shell => !shell.isDestroyed);
        this.each(shell => shell.update());
    }
}
