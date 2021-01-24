var app = app || {};

const elementTemplates = {
    'message': '<li class="history-message">${user}: ${message}</li>'
};

const templates = {
    'game': 'templates/game.html',
    'home': 'templates/home.html',
};

class HtmlService {
    constructor() {
        this.dom = document;
        this.elementTemplates = elementTemplates;
        this.templates = templates;
    }

    getTemplate(templateName) {
        return fetch(this.templates[templateName])
            .then(response => response.text());
    }

    getElement(elementSelector) {
        return this.dom.querySelector(elementSelector);
    }

    getManyElements(elementSelector) {
        return this.dom.querySelectorAll(elementSelector);
    }

    createElement(elementText) {
        const newNode = this.dom.createElement('template');
        newNode.innerHTML = elementText;
        return newNode.content.childNodes[0];
    }

    attachElement(childElement, parentElementSelector) {
        this.dom.querySelector(parentElementSelector).appendChild(childElement);
    }

    getElementFromTemplate(templateName, args) {
        return Object.keys(args).reduce((result, key) => {
            return result.replace('${' + key + '}', args[key]);
        }, this.elementTemplates[templateName]);
    }

    addEventHandler(elementSelector, event, handler) {
        this.dom.querySelector(elementSelector).addEventListener(event, handler);
    }
}

app.htmlService = new HtmlService();
