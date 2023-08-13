import {Scene} from "phaser";
import {Level} from "./Level.ts";

export class Level1 implements Level{
    scene
    background

    constructor(scene: Scene) {
        this.scene = scene
        this.background = this.scene.add.image(0, 0, 'level1').setOrigin(0, 0)
        this.background.setDisplaySize(this.scene.sys.game.canvas.width, this.scene.sys.game.canvas.height)
    }
}