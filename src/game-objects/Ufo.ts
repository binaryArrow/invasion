import {Scene} from "phaser";

export class Ufo {
    ufo
    constructor(scene: Scene) {
        this.ufo = scene.physics.add.image(300, 300, 'ufo')
            .setScale(0.2, 0.2)
            .body.setAllowGravity(false)
    }
}