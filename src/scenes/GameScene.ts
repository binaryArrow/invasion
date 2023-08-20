import {Scene} from "phaser";
import {Ufo} from "../game-objects/Ufo.ts";
import ufo from '../../assets/ufo.png'
import level_1 from '../../assets/background_level_1.png'
import {Level} from "../maps/Level.ts";
import {Level1} from "../maps/Level1.ts";
import {Hooman} from "../game-objects/Hooman.ts";
import {UserInterface} from "../user-interface/UserInterface.ts";

export class GameScene extends Scene {
    ufo: Ufo | undefined
    hoomans: Hooman[] = []
    level: Level | undefined
    ui: UserInterface | undefined

    preload() {
        this.load.image('ufo', ufo);
        this.load.image('level1', level_1);
        this.load.aseprite('laserBeam', '../../assets/laser-beam.png', '../../assets/laser-beam.json')
        this.load.aseprite('hooman', '../../assets/hooman.png', '../../assets/hooman.json')
        this.load.image('hoomanUi', '../../assets/UI/hooman-ui.png')
    }

    create() {
        this.level = new Level1(this)
        this.anims.createFromAseprite('hooman')
        this.ufo = new Ufo(this)
        this.ui = new UserInterface(this)
        for (let i = 0; i < 50; i++) {
            this.hoomans.push(
                new Hooman(this)
            )
        }
        this.setColliders()
        // this code shows the height where hoomans die after fall
        // this.add.line(0, 0, 0, 650, 1000, 650, 0xffff).setLineWidth(1)
    }

    update(_time: number, _delta: number) {
        this.ufo!!.update()
        this.hoomans.forEach(hoooman => hoooman.update())
        this.ui!!.update()
    }

    setColliders() {
        this.hoomans.forEach((hoooman) => {
            this.physics.add.collider(
                hoooman.hooman,
                this.level!!.platform,
                () => {
                    // die when falling from too high
                    if (hoooman.lastHeight < 650) {
                        hoooman.hooman.anims.stop()
                        hoooman.hooman.destroy()
                    }
                }
            )
            this.physics.add.collider(
                hoooman.hooman,
                // @ts-ignore
                this.ufo!!.ufo,
                () => {
                    // give points and die
                    hoooman.hooman.anims.stop()
                    hoooman.hooman.destroy()
                    this.ui!!.score ++
                }
            )
            this.physics.add.overlap(
                this.ufo!!.beam,
                hoooman.hooman,
                () => {
                    hoooman.hooman.setVelocityX(0)
                    hoooman.hooman.body!!.velocity.y = hoooman.upSpeed
                    hoooman.hooman.rotation += 0.05
                    hoooman.lastHeight = hoooman.hooman.y
                }
            )
        })
    }

}