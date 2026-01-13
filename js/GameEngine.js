/*
GameEngine class manages the game logic and interactions.
Contains a constructor to make the game. Initializes an empty array of buttons and expected clicks counter.

Contains methods to create buttons, shuffle them, clear the screen, start the memory phase, and handle when 
the user clicks a button.

Used ChatGPT to help write this class.
*/
import { MemoryButton } from "./MemoryButton.js";
import { STRINGS } from "../lang/messages/en/user.js";
import { ColourList } from "./ColourList.js";

export class GameEngine {
    constructor(container, messageBox) {
        this.container = container;
        this.messageBox = messageBox;
        this.buttons = [];
        this.expectedClicks = 0;
        this.colourPool = [];
    }

    clear() {
        this.container.innerHTML = "";
        this.messageBox.textContent = "";
        this.buttons = [];
        this.expectedClicks = 0;
    }

    shuffleColours() {
        this.colourPool = [...ColourList];
        for (let i = this.colourPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.colourPool[i], this.colourPool[j]] = [this.colourPool[j], this.colourPool[i]];
        }
    }

    createButtons(n) {
        this.clear();
        this.shuffleColours();

        for (let i = 0; i < n; i++) {
            const color = this.colourPool.pop();

            const button = new MemoryButton(i, color, this.container);
            button.setPosition(0, i * 170);
            button.disable();
            
            this.buttons.push(button);
        }
    }

    scramble(n) {
        let count = 0;

        const interval = setInterval(() => {
            const maxX = window.innerWidth - 160;
            const maxY = window.innerHeight - 100;

            this.buttons.forEach(button => {
                button.setPosition(
                    Math.random() * maxY,
                    Math.random() * maxX
                );
            });

            count++;
            if (count === n) {
                clearInterval(interval);
                this.startMemoryPhase();
            }
        }, 2000);
    }
     

    startMemoryPhase() {
        this.buttons.forEach(button => {
            button.hideNumber();
            button.enable();
            button.button.onclick = () => this.handleClick(button);
        });
    }

    handleClick(button) {
        if (button.order === this.expectedClicks) {
            button.revealNumber();
            this.expectedClicks++;

            if (this.expectedClicks === this.buttons.length) {
                this.messageBox.textContent = STRINGS.MSG_SUCCESS;
            }
        } else {
            this.messageBox.textContent = STRINGS.MSG_FAILURE;
            this.buttons.forEach(btn => btn.revealNumber());
            this.buttons.forEach(btn => btn.disable());
        } 
    }
}