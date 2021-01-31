var app = app || {};

class EventService {
    constructor() {
        this.events = {};
    }

    addEventHandler(event, handler) {
        this.events[event] = handler;
    }

    triggerEvent(event, args) {
        if(this.events[event]) {
            this.events[event].call(null, args);
        }
    }
}

app.eventService = new EventService();
