/*
Class meant to control the overall application flow. Constructs the UI elements, initializes the game engine and 
matches the HTML elements to their respective event handlers. Contains initUI and startGame methods.

Used ChatGPT to help write this class.
*/
import { STRINGS } from "../lang/messages/en/user.js";
import { GameEngine } from "./GameEngine.js";
import { NumberValidator } from "./NumberValidator.js";

export class AppController {
    constructor() {
        this.label = document.getElementById("promptLabel");
        this.input = document.getElementById("numberInput");
        this.button = document.getElementById("goButton");
        this.message = document.getElementById("message");
        this.gameArea = document.getElementById("gameArea");

        this.engine = new GameEngine(this.gameArea, this.message);

        this.initUI();
    }

    initUI() {
        this.label.textContent = STRINGS.LABEL_PROMPT;
        this.button.textContent = STRINGS.BTN_LABEL;

        this.button.onclick = () => this.startGame();
    }

    startGame() {
        if (!NumberValidator.isValidNumber(this.input.value)) {
            this.message.textContent = STRINGS.ERROR_RANGE_MESSAGE;
            return;
        }

        const n = Number(this.input.value);
        this.engine.createButtons(n);

        setTimeout(() => {
            this.engine.scramble(n);
        }, n * 1000);    
    
    }

}
