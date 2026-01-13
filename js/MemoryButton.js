/*
Class representing a button in a memory game. 

Each button is given an order number, a color, and is added to a specified container element.
Contains methods to set the button's position, hide/reveal its number the user should be remembering, 
and enable/disable clicking it during shuffling/testing modes.

ChatGPT assisted in writing this class.
*/
export class MemoryButton {
    constructor(order, color, container) {
        this.order = order;
        this.container = container;

        this.topRatio = 0;
        this.leftRatio = 0;

        this.button = document.createElement("button");
        this.button.className = "memory-button";
        this.button.style.backgroundColor = color;
        this.button.textContent = order + 1;
        
        container.appendChild(this.button);
    }

     setPosition(top, left) {
        const rect = this.container.getBoundingClientRect();

        this.topRatio = top / rect.height;
        this.leftRatio = left / rect.width;

        this.applyPosition();
    }

    applyPosition() {
        const rect = this.container.getBoundingClientRect();

        const buttonWidth = this.button.offsetWidth;
        const buttonHeight = this.button.offsetHeight;

        const maxX = rect.width - buttonWidth;
        const maxY = rect.height - buttonHeight;

        this.button.style.top =
            Math.min(this.topRatio * rect.height, maxY) + "px";

        this.button.style.left =
            Math.min(this.leftRatio * rect.width, maxX) + "px";
    }

    hideNumber() {
        this.button.textContent = "";
    }

    revealNumber() {
        this.button.textContent = this.order + 1;
    }

    disable() {
        this.button.disabled = true;
    }

    enable() {
        this.button.disabled = false;
    }

}
