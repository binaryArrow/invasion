import {Scene} from "phaser";

export class Ufo {
    ufo
    beam
    scene
    movementKeys: (Phaser.Input.Keyboard.Key | undefined)[] = []
    constructor(scene: Scene) {
        this.scene = scene
        this.scene.anims.createFromAseprite('laserBeam')
        this.ufo = scene.physics.add.image(300, 80, 'ufo')
            .setImmovable(true)
            .setScale(0.2, 0.2)
            .body.setAllowGravity(false).setSize(300, 300)
            .setCollideWorldBounds(true)
        this.setKeys()
        this.beam = this.scene.physics.add.sprite(this.ufo.x, 200, '')
            .setVisible(false)
            .setOrigin(0.25, 0.03)
            .setScale(1, 0.66)
        this.beam.body.setAllowGravity(false).setSize(30, 10000, false)
        this.beam.body.setOffset(37, 0)
    }

    update() {
        this.updateMovement()
        this.updateActions()
    }

    setKeys() {
        this.movementKeys.push(this.scene.input.keyboard?.addKey('D'))
        this.movementKeys.push(this.scene.input.keyboard?.addKey('A'))
    }

    updateMovement() {
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

    updateActions() {
        if(this.ufo.velocity.x == 0 && this.ufo.rotation > -1 && this.ufo.rotation < 1 && !this.beam.anims.isPlaying) {
            this.beam.setX(this.ufo.x + 3)
                .setY(this.ufo.y + 80)
                .setVisible(true)
                .play({key: 'Beam'})
                .once('animationcomplete', () => {
                    this.beam.play({key: 'Loop', repeat: -1})
                })
                .enableBody()
        } else if(this.ufo.velocity.x != 0) {
            this.beam.setVisible(false).anims.stop()
            this.beam.disableBody()
        }
    }
}