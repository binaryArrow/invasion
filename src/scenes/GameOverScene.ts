import {Scene} from "phaser";

export class GameOverScene extends Scene {

    constructor() {
        super({key: 'GameOverScene'});
    }
    create() {
        this.add.text(700, 100, 'GAME OVER', {
            font: 'bold 25px monospace'
        })
        this.add.text(655, 150, 'Click to restart', {
            font: 'bold 25px monospace'
        })

        this.input.once('pointerdown', ()=> {
            this.scene.stop('GameScene')
            this.scene.launch('GameScene')
            this.scene.stop('GameOverScene')
        })
    }

}