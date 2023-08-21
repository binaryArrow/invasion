import {Scene} from "phaser";
import Sprite = Phaser.Physics.Arcade.Sprite;
import {Ufo} from "./Ufo.ts";

export class MilCar {
    sprite: Sprite;
    scene: Scene
    lastHeight = 720
    moveSpeed = 100
    lastVelocity = Math.random() > 0.5 ? this.moveSpeed : -this.moveSpeed
    ufo

    constructor(scene: Scene, ufo: Ufo) {
        scene.anims.createFromAseprite('milCar')
        this.ufo = ufo
        this.scene = scene
        this.sprite = this.scene.physics.add.sprite(100, 720, 'milCar')
            .setSize(100, 50)
            .setOffset(0, 27)
            .setBounce(0, 0.2)
            .setMaxVelocity(10000, 60)
    }

    update() {
        if (this.sprite?.active) {
            this.updateMovement()
        }
    }

    updateMovement() {
        if (this.lastHeight > this.sprite.y) {
            this.lastHeight = this.sprite.y
        }
        if (this.sprite.body!!.velocity.y == 0) {

            if (this.sprite.x >= this.scene.game.canvas.width - this.sprite.body!!.width) {
                this.sprite.flipX = true
                this.sprite.setVelocityX(-this.moveSpeed)
                this.lastVelocity = -this.moveSpeed
            } else if (this.sprite.x <= this.sprite.body!!.width) {
                this.sprite.flipX = false
                this.lastVelocity = this.moveSpeed
                this.sprite.setVelocityX(this.moveSpeed)
            } else {
                this.sprite.setVelocityX(this.lastVelocity)
            }
        }
    }

}