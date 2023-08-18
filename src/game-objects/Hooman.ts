import {Scene} from "phaser";
import Sprite = Phaser.Physics.Arcade.Sprite;

export class Hooman {
    hooman: Sprite
    lastVelocity
    lastHeight = 905
    scene
    upSpeed = Math.random() * (-150 + 50) - 50

    constructor(scene: Scene) {
        this.scene = scene
        this.scene.anims.createFromAseprite('hooman')
        this.lastVelocity = Math.random() > 0.5 ? -200 : 200
        this.hooman = this.scene.physics.add.sprite(Math.random() * ((window.innerWidth - 50) - 50) + 50, 760, '')
            .setSize(15, 20)
            .setOffset(4, 0)
            .setCollideWorldBounds(true)
            .play({key: 'loop', repeat: -1})
            .setVelocityX(this.lastVelocity)
    }

    update() {
        if (this.hooman?.active) {
            this.updateMovement()
        }
    }

    updateMovement() {
        if (this.hooman.body!!.velocity.y == 0) {
            this.hooman.rotation = 0
            if (this.hooman.x >= 1500) {
                this.hooman.setVelocityX(-200)
                this.lastVelocity = -200
            } else if (this.hooman.x <= 100) {
                this.lastVelocity = 200
                this.hooman.setVelocityX(200)
            } else this.hooman.setVelocityX(this.lastVelocity)
        }
        console.log(this.hooman.x)
        console.log(this.hooman.body!!.x)
    }

}