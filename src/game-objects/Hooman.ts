import {Scene} from "phaser";

export class Hooman {
    hooman
    lastHeight = 905
    scene
    upSpeed = Math.random() * (-150 + 50) - 50

    constructor(scene: Scene) {
        this.scene = scene
        this.scene.anims.createFromAseprite('hooman')
        this.hooman = this.scene.physics.add.sprite(Math.random() * (400 - 50) + 50, 1000, '')
            .setSize(15, 20)
            .setOffset(4, 0)
            .setCollideWorldBounds(true)
            .play({key: 'loop', repeat: -1})
    }

    update() {
        console.log(this.lastHeight)
        if(this.hooman?.active){
        this.updateMovement()
        }
    }

    updateMovement() {
        if (this.hooman.y > 1000) {
            this.hooman.setVelocityX(50)
        }
    }

}