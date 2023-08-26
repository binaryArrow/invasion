import {Scene} from "phaser";
import Sprite = Phaser.Physics.Arcade.Sprite;

export class Hooman {
    hooman: Sprite
    deadImg
    lastVelocity = Math.random() > 0.5 ? 50 : -50
    lastHeight = 760
    scene
    upSpeed = Math.random() * (-150 + 50) - 50
    dead = false

    constructor(scene: Scene) {
        this.scene = scene
        scene.anims.createFromAseprite('hooman')
        // x position random, and y position according to canvas height hardcoded
        this.hooman = this.scene.physics.add.sprite(Math.random() * ((window.innerWidth - 50) - 50) + 50, 760, 'hooman')
            .setSize(15, 20)
            .setOffset(4, 0)
            .setCollideWorldBounds(true)
            .play({key: 'loop', repeat: -1})
            .setVelocityX(this.lastVelocity)
    }

    update() {
        if (this.hooman?.active && !this.dead) {
            this.updateMovement()
        }
    }

    updateMovement() {
        // update last height
        if (this.lastHeight > this.hooman.y) {
            this.lastHeight = this.hooman.y
        }
        if (this.hooman.body!!.velocity.y == 0) {
            this.hooman.rotation = 0
            if (this.hooman.x >= this.scene.game.canvas.width - this.hooman.body!!.width) {
                this.hooman.setVelocityX(-50)
                this.lastVelocity = -50
            } else if (this.hooman.x <= this.hooman.body!!.width) {
                this.lastVelocity = 50
                this.hooman.setVelocityX(50)
            } else {
                this.lastVelocity = Math.random() < 0.99 ? this.lastVelocity : this.lastVelocity * -1
                this.hooman.setVelocityX(this.lastVelocity)
            }
        }
    }
}