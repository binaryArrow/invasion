import {Scene} from "phaser";

export class WinScreen extends Scene {
    seconds: string = ''
    constructor() {
        super({key: 'WinScreen'});
    }
    init(data: any) {
        this.seconds = data.seconds
    }
    create() {
        this.add.text(700, 100, `YOU WON IN ${this.seconds} SECONDS`, {
            font: 'bold 25px monospace'
        })
        this.add.text(750, 150, 'Click to restart', {
            font: 'bold 25px monospace'
        })

        this.input.once('pointerdown', ()=> {
            this.scene.stop('GameScene')
            this.scene.launch('GameScene')
            this.scene.stop('WinScreen')
        })
    }

}