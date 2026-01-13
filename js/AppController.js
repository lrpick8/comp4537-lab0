
import { STRINGS } from "../lang/messages/en/user.js";
import { GameEngine } from "./GameEngine.js";
import { Validator } from "./Validator.js";

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
        this.button.textContent = STRINGS.BUTTON_GO;

        this.button.onclick = () => this.startGame();
    }

    startGame() {
        if (!Validator.isValidNumber(this.input.value)) {
            this.message.textContent = STRINGS.ERROR_INVALID_NUMBER;
            return;
        }

        const n = Number(this.input.value);
        this.engine.createButtons(n);

        setTimeout(() => {
            this.engine.scramble(5);
        }, n * 1000);    
    
    }

}
