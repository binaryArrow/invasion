import {Scene} from "phaser";
import Text = Phaser.GameObjects.Text;
import {Ufo} from "../game-objects/Ufo.ts";

export class UserInterface {
    scene: Scene
    score = 0
    scoreText: Text
    healthText: Text
    ufo: Ufo
    timer
    timerText

    constructor(scene: Scene, ufo: Ufo) {
        this.scene = scene
        this.ufo = ufo
        this.scene.add.sprite(20, 20, 'hoomanUi')
        this.scoreText = scene.add.text(40, 10, this.score.toString(),{
            font: 'bold 25px monospace'
        })
        this.scene.add.sprite(140, 25, 'healthUi').setScale(0.4, 0.4)
        this.healthText = scene.add.text(160, 10, ufo.health.toString(),{
            font: 'bold 25px monospace'
        })
        this.timer = this.scene.time.addEvent({delay: 60000, callback: () => {
                this.scene.scene.pause()
                this.scene.scene.launch('GameOverScene')
            }})
        this.timerText = this.scene.add.text( 1400, 10, '')

    }

    update() {
        this.scoreText.text = this.score.toString() + '/10'
        this.healthText.text = this.ufo.health.toString()
        if(this.ufo.health <= 0) {
            this.scene.scene.pause()
            this.scene.sound.stopAll()
            this.scene.scene.launch('GameOverScene')
        } else if(this.score >= 10) {
            this.scene.scene.pause()
            this.scene.sound.stopAll()
            this.scene.scene.launch('WinScreen', {seconds: (60 - parseFloat(this.timer.getRemainingSeconds().toFixed(2))).toFixed(2).toString()})
        }
        this.timerText.setText('TIME: ' + this.timer.getRemainingSeconds().toFixed(2).toString())
    }
}