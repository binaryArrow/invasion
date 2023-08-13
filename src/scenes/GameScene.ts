import {Scene} from "phaser";
import ufo from '../../assets/ufo.png'
import {Ufo} from "../game-objects/Ufo.ts";

export class GameScene extends Scene {
    preload() {
        this.load.image('ufo', ufo);
    }
    create() {
        new Ufo(this)
    }
    update(_time: number, _delta: number) {
    }
}