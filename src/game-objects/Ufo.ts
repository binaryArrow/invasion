import {Scene} from "phaser";

export class Ufo {
    ufo
    scene
    movementKeys: (Phaser.Input.Keyboard.Key | undefined)[] = []

    constructor(scene: Scene) {
        this.scene = scene
        this.ufo = scene.physics.add.image(300, 80, 'ufo')
            .setScale(0.2, 0.2)
            .body.setAllowGravity(false)
        this.movementKeys.push(this.scene.input.keyboard?.addKey('D'))
        this.movementKeys.push(this.scene.input.keyboard?.addKey('A'))
    }

    update() {
        this.setMovement()
    }
    setMovement() {
        if (this.movementKeys[0]?.isDown || this.scene.input.keyboard?.createCursorKeys().right.isDown) {
            if (this.ufo.rotation < 45)
                this.ufo.rotation = Phaser.Math.Interpolation.Linear([this.ufo.rotation, 45], 0.07);
            this.ufo.setVelocityX(200)
        } else if (this.movementKeys[1]?.isDown || this.scene.input.keyboard?.createCursorKeys().left.isDown) {
            if (this.ufo.rotation > -45)
                this.ufo.rotation = Phaser.Math.Interpolation.Linear([this.ufo.rotation, -45], 0.07);
            this.ufo.setVelocityX(-200)
        } else {
            this.ufo.rotation = Phaser.Math.Interpolation.Linear([this.ufo.rotation, 0], 0.1);
            this.ufo.setVelocityX(0)
        }
    }
}