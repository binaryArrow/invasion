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
    deadImg: any
    dead = false

    constructor(scene: Scene, ufo: Ufo, xPosition?: number) {
        scene.anims.createFromAseprite('milCar')
        this.ufo = ufo
        this.scene = scene
        this.sprite = this.scene.physics.add.sprite(xPosition?? 100, 740, 'milCar')
            .setSize(100, 50)
            .setOffset(0, 27)
            .setBounce(0, 0.2)
            .setMaxVelocity(10000, 60)
            .setDepth(2)
    }

    update() {
        if (this.sprite?.active && !this.dead) {
            this.updateMovement()
        }
    }

    updateMovement() {
        if (this.lastHeight > this.sprite.y) {
            this.lastHeight = this.sprite.y
        }
        if (this.sprite.body!!.velocity.x < 0) {
            this.sprite.flipX = true
        } else if (this.sprite.body!!.velocity.x > 0) {
            this.sprite.flipX = false
        }
        if (this.sprite.body!!.velocity.y == 0) {
            if (this.sprite.x >= this.scene.game.canvas.width - this.sprite.body!!.width) {
                this.sprite.setVelocityX(-this.moveSpeed)
                this.lastVelocity = -this.moveSpeed
            } else if (this.sprite.x <= this.sprite.body!!.width) {
                this.lastVelocity = this.moveSpeed
                this.sprite.setVelocityX(this.moveSpeed)
            } else {
                this.sprite.setVelocityX(this.lastVelocity)
            }
        }
    }

}