import {Scene} from "phaser";
import {Ufo} from "../game-objects/Ufo.ts";
import ufo from '../../assets/ufo.png'
import level_1 from '../../assets/background_level_1.png'
import {Level} from "../maps/Level.ts";
import {Level1} from "../maps/Level1.ts";

export class GameScene extends Scene {
    ufo: Ufo
    level: Level
    preload() {
        this.load.image('ufo', ufo);
        this.load.image('level1', level_1);
    }
    create() {
        this.level = new Level1(this)
        this.ufo = new Ufo(this)
    }
    update(_time: number, _delta: number) {
        this.ufo.update()
    }
}