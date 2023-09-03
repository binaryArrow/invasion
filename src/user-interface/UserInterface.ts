import {Scene} from "phaser";
import Text = Phaser.GameObjects.Text;
import {Ufo} from "../game-objects/Ufo.ts";

export class UserInterface {
    scene: Scene
    score = 0
    scoreText: Text
    healthText: Text
    ufo: Ufo

    constructor(scene: Scene, ufo: Ufo) {
        this.scene = scene
        this.ufo = ufo
        this.scene.add.sprite(20, 20, 'hoomanUi')
        this.scoreText = scene.add.text(40, 10, this.score.toString(),{
            font: 'bold 25px monospace'
        })
        this.scene.add.sprite(100, 25, 'healthUi').setScale(0.4, 0.4)
        this.healthText = scene.add.text(125, 10, ufo.health.toString(),{
            font: 'bold 25px monospace'
        })
    }

    update() {
        this.scoreText.text = this.score.toString()
        this.healthText.text = this.ufo.health.toString()
    }
}