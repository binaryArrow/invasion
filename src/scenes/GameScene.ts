import {Scene} from "phaser";
import {Ufo} from "../game-objects/Ufo.ts";
import ufo from '../../assets/ufo.png'
import level_1 from '../../assets/background_level_1.png'
import {Level} from "../maps/Level.ts";
import {Level1} from "../maps/Level1.ts";
import {Hooman} from "../game-objects/Hooman.ts";

export class GameScene extends Scene {
    ufo: Ufo | undefined
    hoomans: Hooman[] = []
    level: Level | undefined
    preload() {
        this.load.image('ufo', ufo);
        this.load.image('level1', level_1);
        this.load.aseprite('laserBeam', '../../assets/laser-beam.png','../../assets/laser-beam.json')
        this.load.aseprite('hooman', '../../assets/hooman.png','../../assets/hooman.json')
    }
    create() {
        this.level = new Level1(this)
        this.ufo = new Ufo(this)
        for (let i = 0; i <= 50; i++) {
            this.hoomans.push(
              new Hooman(this)
            )
        }
        this.setColliders()
    }
    update(_time: number, _delta: number) {
        this.ufo!!.update()
        this.hoomans.forEach(hoooman => hoooman.update())
    }

    setColliders() {
        this.hoomans.forEach(hoooman => {
            this.physics.add.collider(
                hoooman.hooman,
                this.level!!.platform,
                ()=>{
                    if(hoooman.lastHeight < 800) {
                        hoooman.hooman.destroy()
                    }
                }
            )
            this.physics.add.overlap(
                this.ufo!!.beam,
                hoooman.hooman,
                () => {
                    hoooman.hooman.setVelocityX(0)
                    hoooman.hooman.body.velocity.y = hoooman.upSpeed
                    hoooman.hooman.rotation += 0.05
                    hoooman.lastHeight = hoooman.hooman.y
                }
            )
        })
    }

}