import {Scene} from "phaser";
import Sprite = Phaser.Physics.Arcade.Sprite;
import {Ufo} from "./Ufo.ts";
import Image = Phaser.Physics.Arcade.Image;


export class MilCar {
    sprite: Sprite;
    scene: Scene
    lastHeight = 720
    moveSpeed = 100
    lastVelocity = Math.random() > 0.5 ? this.moveSpeed : -this.moveSpeed
    ufo: Ufo
    deadImg: any
    dead = false
    bullets:Image[] = []
    lastShot = 0

    constructor(scene: Scene, ufo: Ufo, xPosition?: number) {
        scene.anims.createFromAseprite('milCar')
        scene.anims.createFromAseprite('explosion')
        this.ufo = ufo
        this.scene = scene
        this.sprite = this.scene.physics.add.sprite(xPosition ?? 100, 740, 'milCar')
            .setSize(100, 50)
            .setOffset(0, 27)
            .setBounce(0, 0.2)
            .setMaxVelocity(10000, 60)
            .setDepth(2)
    }

    update(time: number, delta: number) {
        if (this.sprite?.active && !this.dead) {
            this.updateMovement()
        }
        this.fire(time, delta)
        this.bullets.forEach(bullet => {
            if(bullet.y <= 0) {
                bullet.destroy()
            }
        })
    }


    fire(_time: number, delta: number) {
        if (this.lastShot > 3000 && !this.dead) {
            let bullet = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'explosion').setScale(0.3, 0.3)
            bullet.setSize(50, 50)
            this.bullets.push(bullet)
            // @ts-ignore
            this.scene.physics.add.collider(bullet, this.ufo.ufo, ()=>{
                bullet.play({key: 'explode', repeat: 1}).once('animationcomplete', () => {
                    bullet.destroy()
                })
                this.ufo.health --
            })
            // @ts-ignore
            this.bullets[this.bullets.length - 1].body!!.setAllowGravity(false)
            this.scene.physics.moveTo(this.bullets[this.bullets.length - 1], this.ufo.ufo.x, this.ufo.ufo.y, 200)
            this.lastShot = 0
        }
        this.lastShot += delta

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