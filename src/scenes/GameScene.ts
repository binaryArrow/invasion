import {Scene} from "phaser";
import {Ufo} from "../game-objects/Ufo.ts";
import {Level} from "../maps/Level.ts";
import {Level1} from "../maps/Level1.ts";
import {Hooman} from "../game-objects/Hooman.ts";
import {UserInterface} from "../user-interface/UserInterface.ts";
import {MilCar} from "../game-objects/MilCar.ts";

export class GameScene extends Scene {
    ufo: Ufo | undefined
    hoomans: Hooman[] = []
    level: Level | undefined
    ui: UserInterface | undefined
    milCars: MilCar[] = []

    constructor() {
        super({key: 'GameScene'});
    }
    preload() {
        this.load.image('ufo', './assets/ufo.png');
        this.load.image('level1', './assets/background_level_1.png');
        this.load.aseprite('laserBeam', './assets/laser-beam.png', './assets/laser-beam.json')
        this.load.aseprite('hooman', './assets/hooman.png', './assets/hooman.json')
        this.load.aseprite('milCar', './assets/enemies/mil_car.png', './assets/enemies/mil_car.json')
        this.load.aseprite('explosion', './assets/enemies/explosion.png', './assets/enemies/explosion.json')
        this.load.image('bomb', './assets/enemies/bomb.png')
        this.load.image('milCarDead', './assets/enemies/mil_car_dead.png')
        this.load.image('hoomanUi', './assets/UI/hooman-ui.png')
        this.load.image('healthUi', './assets/UI/health.png')
        this.load.image('hoomanDead', './assets/hooman_dead.png')
        this.load.audio('lvl1', './assets/sounds/lvl1.mp3')
    }

    create() {
        // create level
        this.level = new Level1(this)
        this.sound.play('lvl1', {loop: true, volume: 0.2})

        // create game objects
        this.ufo = new Ufo(this)
        this.milCars = [new MilCar(this, this.ufo), new MilCar(this, this.ufo, 1200)]
        for (let i = 0; i < 50; i++) {
            this.hoomans.push(
                new Hooman(this)
            )
        }
        // create UI
        this.ui = new UserInterface(this, this.ufo);

        // set colliders
        this.setColliders()

        // this code shows the height where hoomans die after fall
        // this.add.line(0, 0, 0, 650, 1000, 650, 0xffff).setLineWidth(1)
    }

    update(_time: number, _delta: number) {
        this.ufo!.update()
        this.milCars.forEach(milCar => milCar.update(_time, _delta))
        this.hoomans.forEach(hoooman => hoooman.update())
        this.ui!.update()
    }

    setColliders() {
        this.setHoomanColliders()
        this.setMilCarColliders()
    }

    setMilCarColliders() {
        this.milCars.forEach(milCar => {
            this.physics.add.collider(
                milCar.sprite,
                this.level!!.platform,
                () => {
                    // die when falling from too high
                    if (milCar.lastHeight < 650) {
                        milCar.sprite.anims.stop()
                        milCar.dead = true
                        milCar.sprite.destroy()
                        if (milCar.lastVelocity < 0) {
                            milCar.deadImg = this.add.image(milCar.sprite.x, milCar.sprite.y, 'milCarDead')
                                .setDepth(1)
                                .setFlip(true, false)
                        } else if (milCar.lastVelocity > 0) {
                            milCar.deadImg = this.add.image(milCar.sprite.x, milCar.sprite.y, 'milCarDead')
                                .setDepth(1)
                                .setFlip(false, false)
                        }
                    } else if (milCar.sprite.active) {
                        milCar.sprite.body!.velocity.y = 0
                        milCar.sprite.play('drive', true)
                    }
                }
            )
            this.physics.add.overlap(
                this.ufo!!.beam,
                milCar.sprite,
                () => {
                    milCar.sprite.setVelocityX(0)
                    milCar.sprite.body!.velocity.y = -25
                    milCar.lastHeight = milCar.sprite.y
                    if (milCar?.sprite.active) {
                        milCar.sprite.anims.stop()
                    }
                }
            )
        })
    }

    setHoomanColliders() {
        this.hoomans.forEach((hoooman) => {
            this.physics.add.collider(
                hoooman.hooman,
                this.level!!.platform,
                () => {
                    // die when falling from too high
                    if (hoooman.lastHeight < 650) {
                        hoooman.hooman.anims.stop()
                        hoooman.dead = true
                        hoooman.hooman.destroy()
                        hoooman.deadImg = this.add.image(hoooman.hooman.x, hoooman.hooman.y - hoooman.hooman.height / 6, 'hoomanDead')
                            .setScale(0.25, 0.25)
                        hoooman.lastHeight = hoooman.hooman.y
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
                    this.ui!!.score++
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