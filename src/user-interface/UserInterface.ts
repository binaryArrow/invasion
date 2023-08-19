import {Scene} from "phaser";
import Text = Phaser.GameObjects.Text;

export class UserInterface {
    scene: Scene
    score = 0
    scoreText: Text

    constructor(scene: Scene) {
        this.scene = scene
        this.scene.add.sprite(20, 20, 'hoomanUi')
        this.scoreText = scene.add.text(40, 10, this.score.toString(),{
            font: 'bold 25px monospace'
        })
    }

    update() {
        this.scoreText.text = this.score.toString()
    }
}